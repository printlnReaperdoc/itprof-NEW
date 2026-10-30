const path = require('path');
const fs = require('fs');
const https = require('https');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

/**
 * Determine Cloudinary resource_type for a file.
 * In Cloudinary:
 * - PPT, PPTX must be 'raw'.
 * - PDF can be stored as 'raw' or 'auto' (raw ensures original binary preservation without image conversion).
 */
const getResourceType = (filenameOrExt) => {
  const ext = (path.extname(filenameOrExt) || filenameOrExt).toLowerCase();
  if (['.ppt', '.pptx'].includes(ext)) {
    return 'raw';
  }
  if (ext === '.pdf') {
    return 'raw';
  }
  return 'auto';
};

/**
 * Upload local file to Cloudinary
 */
const uploadFileToCloudinary = async (filePath, options = {}) => {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
  }

  const ext = path.extname(filePath).toLowerCase();
  const resourceType = options.resourceType || getResourceType(ext);

  const uploadOptions = {
    folder: options.folder || 'itprof/chapter-materials',
    resource_type: resourceType,
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    ...options
  };

  const result = await cloudinary.uploader.upload(filePath, uploadOptions);
  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type || resourceType,
    format: result.format || ext.replace('.', ''),
    bytes: result.bytes
  };
};

/**
 * Upload Buffer (e.g. from in-memory PDF generation) to Cloudinary
 */
const uploadBufferToCloudinary = async (buffer, filename, options = {}) => {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
  }

  const ext = path.extname(filename).toLowerCase();
  const resourceType = options.resourceType || getResourceType(ext);

  const cleanBase = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const publicId = options.publicId || `${cleanBase}_${Date.now()}${ext}`;

  const uploadOptions = {
    folder: options.folder || 'itprof/exports',
    resource_type: resourceType,
    public_id: publicId,
    use_filename: true,
    overwrite: true,
    ...options
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type || resourceType,
          format: result.format || ext.replace('.', ''),
          bytes: result.bytes
        });
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Delete asset from Cloudinary
 */
const deleteFromCloudinary = async (publicId, resourceType = 'raw') => {
  if (!isCloudinaryConfigured()) {
    return { result: 'skipped_not_configured' };
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (err) {
    console.warn(`[Cloudinary] Failed to delete asset ${publicId}:`, err.message);
    return { error: err.message };
  }
};

/**
 * Generate authenticated signed download URL for private or restricted assets
 */
const generateSignedDownloadUrl = (publicId, options = {}) => {
  if (!isCloudinaryConfigured()) return null;
  try {
    return cloudinary.utils.private_download_url(publicId, '', {
      resource_type: options.resourceType || 'raw',
      type: 'upload',
      attachment: Boolean(options.attachment),
      expires_at: Math.floor(Date.now() / 1000) + (options.expiresInSeconds || 3600)
    });
  } catch (err) {
    console.warn(`[Cloudinary] Failed generating signed URL for ${publicId}:`, err.message);
    return null;
  }
};

/**
 * Stream asset directly from Cloudinary to client response (res)
 * Bypasses public CDN delivery restrictions for unverified accounts and guarantees original headers
 */
const streamCloudinaryFile = async (publicId, res, options = {}) => {
  const signedUrl = generateSignedDownloadUrl(publicId, options);
  if (!signedUrl) {
    throw new Error('Could not generate signed download URL from Cloudinary');
  }

  return new Promise((resolve, reject) => {
    https.get(signedUrl, (cloudRes) => {
      if (cloudRes.statusCode >= 400) {
        return reject(new Error(`Cloudinary returned HTTP status ${cloudRes.statusCode}`));
      }

      if (options.contentType) {
        res.setHeader('Content-Type', options.contentType);
      } else if (cloudRes.headers['content-type']) {
        res.setHeader('Content-Type', cloudRes.headers['content-type']);
      }

      if (options.contentDisposition) {
        res.setHeader('Content-Disposition', options.contentDisposition);
      }

      if (cloudRes.headers['content-length']) {
        res.setHeader('Content-Length', cloudRes.headers['content-length']);
      }

      cloudRes.pipe(res);
      cloudRes.on('end', resolve);
      cloudRes.on('error', reject);
    }).on('error', reject);
  });
};

module.exports = {
  isCloudinaryConfigured,
  uploadFileToCloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  generateSignedDownloadUrl,
  streamCloudinaryFile,
  getResourceType
};

