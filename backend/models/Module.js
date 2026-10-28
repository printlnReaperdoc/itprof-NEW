const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
      index: true
    },
    moduleNumber: {
      type: Number,
      required: [true, 'Module number is required']
    },
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

moduleSchema.index({ courseId: 1, moduleNumber: 1 }, { unique: true });

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;

