const Lesson = require('../models/Lesson');
const Chapter = require('../models/Chapter');
const LessonFile = require('../models/LessonFile');
const { canAccessChapter } = require('../services/progress.service');
const { createAuditLog } = require('../services/audit.service');
const {
  isCloudinaryConfigured,
  uploadFileToCloudinary,
  deleteFromCloudinary,
  streamCloudinaryFile,
  generateSignedDownloadUrl
} = require('../services/cloudinary.service');
const fs = require('fs');
const path = require('path');

/**
 * Get lesson for a chapter
 */
const getLessonByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const accessCheck = await canAccessChapter(req.user, chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked.',
        code: 'CHAPTER_LOCKED'
      });
    }

    const chapter = await Chapter.findById(chapterId)
      .populate('courseId', 'courseCode courseTitle classification')
      .populate('moduleId', 'moduleNumber title');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    const lesson = await Lesson.findOne({ chapterId });
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson content not found for this chapter' });
    }

    // Attach uploaded files if any
    const files = await LessonFile.find({ chapterId }).select('-storagePath');

    res.json({
      success: true,
      chapter: {
        id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        course: chapter.courseId,
        module: chapter.moduleId
      },
      lesson,
      files
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update lesson content (Faculty only)
 */
const updateLesson = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const {
      overview,
      learningObjectives,
      content,
      keyConcepts,
      studyGuide,
      publicationStatus
    } = req.body;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let lesson = await Lesson.findOne({ chapterId });
    const isNew = !lesson;

    if (isNew) {
      lesson = new Lesson({
        chapterId,
        overview: overview || '',
        learningObjectives: learningObjectives || [],
        content: content || '',
        keyConcepts: keyConcepts || [],
        studyGuide: studyGuide || [],
        publicationStatus: publicationStatus || 'published',
        createdBy: req.user._id,
        updatedBy: req.user._id
      });
    } else {
      if (overview !== undefined) lesson.overview = overview;
      if (learningObjectives !== undefined) lesson.learningObjectives = learningObjectives;
      if (content !== undefined) lesson.content = content;
      if (keyConcepts !== undefined) lesson.keyConcepts = keyConcepts;
      if (studyGuide !== undefined) lesson.studyGuide = studyGuide;
      if (publicationStatus !== undefined) lesson.publicationStatus = publicationStatus;
      lesson.updatedBy = req.user._id;
    }

    await lesson.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: isNew ? 'LESSON_CREATED' : 'LESSON_UPDATED',
      entityType: 'Lesson',
      entityId: lesson._id,
      details: {
        chapterId,
        chapterNumber: chapter.chapterNumber,
        publicationStatus: lesson.publicationStatus
      },
      req
    });

    res.json({
      success: true,
      message: 'Lesson updated successfully.',
      lesson
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Upload lesson file (Faculty only)
 */
const uploadLessonFile = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let cloudinaryData = null;
    if (isCloudinaryConfigured()) {
      try {
        const ext = path.extname(req.file.originalname);
        const baseName = path.parse(req.file.originalname).name.replace(/[^a-zA-Z0-9_-]/g, '_');
        cloudinaryData = await uploadFileToCloudinary(req.file.path, {
          folder: `itprof/chapter-materials/ch_${chapter.chapterNumber}`,
          public_id: `${baseName}_${Date.now()}${ext}`
        });
      } catch (cloudErr) {
        console.warn('[Cloudinary] Upload warning (saved locally as fallback):', cloudErr.message);
      }
    }

    const lessonFile = new LessonFile({
      chapterId,
      originalFilename: req.file.originalname,
      storedFilename: req.file.filename,
      storagePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      cloudinaryUrl: cloudinaryData?.secureUrl || null,
      cloudinaryPublicId: cloudinaryData?.publicId || null,
      cloudinaryResourceType: cloudinaryData?.resourceType || null,
      storageType: cloudinaryData ? 'cloudinary' : 'local'
    });

    await lessonFile.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'LESSON_FILE_UPLOADED',
      entityType: 'LessonFile',
      entityId: lessonFile._id,
      details: {
        chapterId,
        filename: req.file.originalname,
        size: req.file.size,
        storageType: lessonFile.storageType,
        cloudinaryUrl: lessonFile.cloudinaryUrl
      },
      req
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: lessonFile._id,
        _id: lessonFile._id,
        chapterId: lessonFile.chapterId,
        originalFilename: lessonFile.originalFilename,
        storedFilename: lessonFile.storedFilename,
        fileSize: lessonFile.fileSize,
        mimeType: lessonFile.mimeType,
        cloudinaryUrl: lessonFile.cloudinaryUrl,
        storageType: lessonFile.storageType,
        createdAt: lessonFile.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Download or stream an uploaded lesson file (PDF, PPT, etc.)
 */
const downloadLessonFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await LessonFile.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Access control: verify user can access this chapter
    const accessCheck = await canAccessChapter(req.user, file.chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked.',
        code: 'CHAPTER_LOCKED'
      });
    }

    const isInline = req.query.inline === 'true';
    const contentDisposition = `${isInline ? 'inline' : 'attachment'}; filename="${encodeURIComponent(file.originalFilename)}"`;
    const resolvedMime = file.mimeType || (file.originalFilename?.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream');

    // 1. If asset is in Cloudinary, stream it directly using authenticated backend stream
    // This bypasses the Cloudinary "show_original_customer_untrusted" public delivery block for unverified accounts
    if (file.cloudinaryPublicId) {
      try {
        await streamCloudinaryFile(file.cloudinaryPublicId, res, {
          resourceType: file.cloudinaryResourceType || 'raw',
          contentType: resolvedMime,
          contentDisposition,
          attachment: !isInline
        });
        return;
      } catch (streamErr) {
        console.warn(`[Cloudinary Stream] Falling back for ${file.originalFilename}:`, streamErr.message);

        // Fallback A: Authenticated signed download URL redirect
        const signedUrl = generateSignedDownloadUrl(file.cloudinaryPublicId, {
          resourceType: file.cloudinaryResourceType || 'raw',
          attachment: !isInline
        });
        if (signedUrl) {
          return res.redirect(signedUrl);
        }
      }
    }

    // 2. Local disk file fallback
    if (file.storagePath && fs.existsSync(file.storagePath)) {
      if (isInline && resolvedMime === 'application/pdf') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.originalFilename)}"`);
        return res.sendFile(path.resolve(file.storagePath));
      }
      return res.download(file.storagePath, file.originalFilename);
    }

    // 3. Fallback to public Cloudinary URL if available
    if (file.cloudinaryUrl) {
      return res.redirect(file.cloudinaryUrl);
    }

    return res.status(404).json({ success: false, message: 'File not found in storage' });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete lesson file (Faculty only)
 */
const deleteLessonFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await LessonFile.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Delete from Cloudinary if stored there
    if (file.cloudinaryPublicId) {
      await deleteFromCloudinary(file.cloudinaryPublicId, file.cloudinaryResourceType || 'raw');
    }

    // Unlink physical file if exists locally
    if (file.storagePath && fs.existsSync(file.storagePath)) {
      try {
        fs.unlinkSync(file.storagePath);
      } catch (err) {
        console.warn(`[Storage] Could not unlink ${file.storagePath}:`, err.message);
      }
    }

    await LessonFile.findByIdAndDelete(fileId);

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'LESSON_FILE_DELETED',
      entityType: 'LessonFile',
      entityId: fileId,
      details: {
        filename: file.originalFilename,
        cloudinaryPublicId: file.cloudinaryPublicId
      },
      req
    });

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLessonByChapter,
  updateLesson,
  uploadLessonFile,
  downloadLessonFile,
  deleteLessonFile
};

