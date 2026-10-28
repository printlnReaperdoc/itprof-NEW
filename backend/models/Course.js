const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    courseTitle: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    classification: {
      type: String,
      required: [true, 'Course classification is required'],
      trim: true
    },
    academicYearLevel: {
      type: String,
      default: '4th Year',
      trim: true
    },
    term: {
      type: String,
      default: '1st Term',
      trim: true
    },
    academicDesignation: {
      type: String,
      default: '4th Year, 1st Term (4-1)',
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

