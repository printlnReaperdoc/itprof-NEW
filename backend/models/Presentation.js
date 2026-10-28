const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['text', 'bullets', 'code', 'diagram', 'table', 'quote', 'callout'],
      required: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const slideSchema = new mongoose.Schema(
  {
    slideNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    contentBlocks: [contentBlockSchema],
    notes: {
      type: String,
      default: ''
    }
  },
  { _id: true }
);

const presentationSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter reference is required'],
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Presentation title is required']
    },
    slides: [slideSchema],
    version: {
      type: Number,
      default: 1
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
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Presentation = mongoose.model('Presentation', presentationSchema);
module.exports = Presentation;

