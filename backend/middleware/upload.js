const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '..', 'storage', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${uuidv4()}${ext}`;
    cb(null, safeName);
  }
});

const allowedMimes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/powerpoint',
  'application/mspowerpoint',
  'application/x-mspowerpoint',
  'application/x-ppt',
  'application/octet-stream',
  'application/zip',
  'application/x-zip-compressed',
  'application/json',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const allowedExtensions = ['.pdf', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.webp', '.json', '.csv', '.xlsx'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error(`Unsupported file type: ${ext}. Allowed formats include PDF (.pdf) and PowerPoint (.ppt, .pptx)`), false);
  }

  // If extension is pdf, ppt, or pptx, allow it even if OS reports octet-stream/zip
  if (['.pdf', '.ppt', '.pptx'].includes(ext)) {
    return cb(null, true);
  }

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error(`Unsupported MIME type: ${file.mimetype} for file ${file.originalname}`), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB for rich presentation decks and documents
  },
  fileFilter
});

module.exports = upload;

