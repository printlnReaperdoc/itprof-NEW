const Lesson = require('../models/Lesson');
const Chapter = require('../models/Chapter');
const LessonFile = require('../models/LessonFile');
const { canAccessChapter } = require('../services/progress.service');
const { createAuditLog } = require('../services/audit.service');
const fs = require('fs');
const path = require('path');

/**
 * Get lesson for a chapter
 */
const getLessonByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const accessCheck = await canAccessChapter(req.user, chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked.',
        code: 'CHAPTER_LOCKED'
      });
    }

    const chapter = await Chapter.findById(chapterId)
      .populate('courseId', 'courseCode courseTitle classification')
      .populate('moduleId', 'moduleNumber title');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    const lesson = await Lesson.findOne({ chapterId });
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson content not found for this chapter' });
    }

    // Attach uploaded files if any
    const files = await LessonFile.find({ chapterId }).select('-storagePath');

    res.json({
      success: true,
      chapter: {
        id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        course: chapter.courseId,
        module: chapter.moduleId
      },
      lesson,
      files
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update lesson content (Faculty only)
 */
const updateLesson = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const {
      overview,
      learningObjectives,
      content,
      keyConcepts,
      studyGuide,
      publicationStatus
    } = req.body;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let lesson = await Lesson.findOne({ chapterId });
    const isNew = !lesson;

    if (isNew) {
      lesson = new Lesson({
        chapterId,
        overview: overview || '',
        learningObjectives: learningObjectives || [],
        content: content || '',
        keyConcepts: keyConcepts || [],
        studyGuide: studyGuide || [],
        publicationStatus: publicationStatus || 'published',
        createdBy: req.user._id,
        updatedBy: req.user._id
      });
    } else {
      if (overview !== undefined) lesson.overview = overview;
      if (learningObjectives !== undefined) lesson.learningObjectives = learningObjectives;
      if (content !== undefined) lesson.content = content;
      if (keyConcepts !== undefined) lesson.keyConcepts = keyConcepts;
      if (studyGuide !== undefined) lesson.studyGuide = studyGuide;
      if (publicationStatus !== undefined) lesson.publicationStatus = publicationStatus;
      lesson.updatedBy = req.user._id;
    }

    await lesson.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: isNew ? 'LESSON_CREATED' : 'LESSON_UPDATED',
      entityType: 'Lesson',
      entityId: lesson._id,
      details: {
        chapterId,
        chapterNumber: chapter.chapterNumber,
        publicationStatus: lesson.publicationStatus
      },
      req
    });

    res.json({
      success: true,
      message: 'Lesson updated successfully.',
      lesson
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Upload lesson file (Faculty only)
 */
const uploadLessonFile = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    const lessonFile = new LessonFile({
      chapterId,
      originalFilename: req.file.originalname,
      storedFilename: req.file.filename,
      storagePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user._id
    });

    await lessonFile.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'LESSON_FILE_UPLOADED',
      entityType: 'LessonFile',
      entityId: lessonFile._id,
      details: {
        chapterId,
        filename: req.file.originalname,
        size: req.file.size
      },
      req
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: lessonFile._id,
        _id: lessonFile._id,
        chapterId: lessonFile.chapterId,
        originalFilename: lessonFile.originalFilename,
        storedFilename: lessonFile.storedFilename,
        fileSize: lessonFile.fileSize,
        mimeType: lessonFile.mimeType,
        createdAt: lessonFile.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Download or stream an uploaded lesson file (PDF, PPT, etc.)
 */
const downloadLessonFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await LessonFile.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Access control: verify user can access this chapter
    const accessCheck = await canAccessChapter(req.user, file.chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked.',
        code: 'CHAPTER_LOCKED'
      });
    }

    if (!fs.existsSync(file.storagePath)) {
      return res.status(404).json({ success: false, message: 'File not found in storage' });
    }

    // Check if inline view requested (e.g. previewing PDF in browser)
    const isInline = req.query.inline === 'true';
    if (isInline && file.mimeType === 'application/pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.originalFilename)}"`);
      return res.sendFile(path.resolve(file.storagePath));
    }

    res.download(file.storagePath, file.originalFilename);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete lesson file (Faculty only)
 */
const deleteLessonFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await LessonFile.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Unlink physical file
    if (fs.existsSync(file.storagePath)) {
      fs.unlinkSync(file.storagePath);
    }

    await LessonFile.findByIdAndDelete(fileId);

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'LESSON_FILE_DELETED',
      entityType: 'LessonFile',
      entityId: fileId,
      details: {
        filename: file.originalFilename
      },
      req
    });

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLessonByChapter,
  updateLesson,
  uploadLessonFile,
  downloadLessonFile,
  deleteLessonFile
};

