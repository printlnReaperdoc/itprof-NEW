const mongoose = require('mongoose');

const questionOptionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: [true, 'Question reference is required'],
      index: true
    },
    optionLabel: {
      type: String,
      required: [true, 'Option label is required'], // 'A', 'B', 'C', 'D'
      trim: true
    },
    optionText: {
      type: String,
      required: [true, 'Option text is required'],
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

questionOptionSchema.index({ questionId: 1, optionLabel: 1 }, { unique: true });

const QuestionOption = mongoose.model('QuestionOption', questionOptionSchema);
module.exports = QuestionOption;

