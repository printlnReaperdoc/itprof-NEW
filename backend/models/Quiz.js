const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
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
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true
    },
    version: {
      type: Number,
      default: 1
    },
    timeLimitSeconds: {
      type: Number,
      default: 600 // 10 minutes
    },
    questionCount: {
      type: Number,
      default: 20
    },
    passingScore: {
      type: Number,
      default: 15 // 15 out of 20 = 75%
    },
    publicationStatus: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

quizSchema.index({ chapterId: 1, version: 1 }, { unique: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

