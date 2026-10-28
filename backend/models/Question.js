const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: [true, 'Quiz reference is required'],
      index: true
    },
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true
    },
    questionType: {
      type: String,
      default: 'multiple-choice'
    },
    points: {
      type: Number,
      default: 1
    },
    position: {
      type: Number,
      required: [true, 'Question position is required']
    }
  },
  {
    timestamps: true
  }
);

questionSchema.index({ quizId: 1, position: 1 }, { unique: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

