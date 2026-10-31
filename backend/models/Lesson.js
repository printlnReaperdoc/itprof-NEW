const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter reference is required'],
      unique: true,
      index: true
    },
    overview: {
      type: String,
      required: [true, 'Lesson overview is required']
    },
    learningObjectives: {
      type: [String],
      default: []
    },
    content: {
      type: String,
      required: [true, 'Lesson content is required']
    },
    keyConcepts: [
      {
        term: { type: String, required: true },
        definition: { type: String, required: true }
      }
    ],
    studyGuide: {
      type: [String],
      default: []
    },
    citations: [
      {
        citationText: { type: String, required: true },
        title: { type: String },
        authors: { type: String },
        year: { type: Number },
        url: { type: String, required: true },
        sourceType: {
          type: String,
          enum: ['book', 'journal', 'standard', 'whitepaper', 'website', 'wikipedia'],
          default: 'book'
        }
      }
    ],
    videos: [
      {
        title: { type: String, required: true },
        youtubeUrl: { type: String, required: true },
        youtubeId: { type: String, required: true },
        channel: { type: String },
        description: { type: String }
      }
    ],
    publicationStatus: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;

