const mongoose = require('mongoose');

const attemptAnswerSchema = new mongoose.Schema(
  {
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuizAttempt',
      required: [true, 'Attempt reference is required'],
      index: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: [true, 'Question reference is required'],
      index: true
    },
    selectedOptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionOption',
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    answeredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

attemptAnswerSchema.index({ attemptId: 1, questionId: 1 }, { unique: true });

const AttemptAnswer = mongoose.model('AttemptAnswer', attemptAnswerSchema);
module.exports = AttemptAnswer;

