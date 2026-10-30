const mongoose = require('mongoose');

const lessonFileSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter reference is required'],
      index: true
    },
    originalFilename: {
      type: String,
      required: [true, 'Original filename is required']
    },
    storedFilename: {
      type: String,
      required: [true, 'Stored filename is required']
    },
    storagePath: {
      type: String,
      required: [true, 'Storage path is required']
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required']
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required']
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cloudinaryUrl: {
      type: String,
      default: null
    },
    cloudinaryPublicId: {
      type: String,
      default: null
    },
    cloudinaryResourceType: {
      type: String,
      default: null
    },
    storageType: {
      type: String,
      enum: ['cloudinary', 'local'],
      default: 'local'
    }
  },
  {
    timestamps: true
  }
);

const LessonFile = mongoose.model('LessonFile', lessonFileSchema);
module.exports = LessonFile;

