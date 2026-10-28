const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
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
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: [true, 'Quiz reference is required'],
      index: true
    },
    quizVersion: {
      type: Number,
      required: true,
      default: 1
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    deadlineAt: {
      type: Date,
      required: true
    },
    submittedAt: {
      type: Date
    },
    correctAnswers: {
      type: Number,
      default: 0
    },
    scorePercentage: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'timed_out'],
      default: 'in_progress'
    },
    submissionType: {
      type: String,
      enum: ['manual', 'auto_timeout'],
      default: 'manual'
    }
  },
  {
    timestamps: true
  }
);

quizAttemptSchema.index({ studentId: 1, chapterId: 1, createdAt: -1 });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
module.exports = QuizAttempt;

