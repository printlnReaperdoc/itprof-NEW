const mongoose = require('mongoose');

const chapterProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student reference is required'],
      index: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
      index: true
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter reference is required'],
      index: true
    },
    status: {
      type: String,
      enum: ['locked', 'available', 'in_progress', 'passed', 'failed'],
      default: 'locked'
    },
    passedAt: {
      type: Date,
      default: null
    },
    highestScore: {
      type: Number,
      default: 0
    },
    highestScorePercentage: {
      type: Number,
      default: 0
    },
    attemptsCount: {
      type: Number,
      default: 0
    },
    latestAttemptAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

chapterProgressSchema.index({ studentId: 1, chapterId: 1 }, { unique: true });
chapterProgressSchema.index({ studentId: 1, courseId: 1 });

const ChapterProgress = mongoose.model('ChapterProgress', chapterProgressSchema);
module.exports = ChapterProgress;

