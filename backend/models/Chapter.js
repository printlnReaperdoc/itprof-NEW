const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
      index: true
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Module reference is required'],
      index: true
    },
    chapterNumber: {
      type: Number,
      required: [true, 'Chapter number is required']
    },
    title: {
      type: String,
      required: [true, 'Chapter title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

chapterSchema.index({ courseId: 1, chapterNumber: 1 }, { unique: true });

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;

