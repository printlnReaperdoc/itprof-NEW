const Chapter = require('../models/Chapter');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Presentation = require('../models/Presentation');
const Quiz = require('../models/Quiz');
const LessonFile = require('../models/LessonFile');
const ChapterProgress = require('../models/ChapterProgress');
const { canAccessChapter } = require('../services/progress.service');
const { createAuditLog } = require('../services/audit.service');
const { getChapterSummaryData } = require('../services/chapterSummary.service');

/**
 * Get chapter details with access verification
 */
const getChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const accessCheck = await canAccessChapter(req.user, chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'This chapter is currently locked. Complete previous chapter assessments first.',
        code: 'CHAPTER_LOCKED'
      });
    }

    const chapter = await Chapter.findById(chapterId)
      .populate('courseId', 'courseCode courseTitle classification')
      .populate('moduleId', 'moduleNumber title');

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }

    const lesson = await Lesson.findOne({ chapterId: chapter._id });
    const presentation = await Presentation.findOne({ chapterId: chapter._id })
      .select('-slides.notes'); // Exclude presenter notes from default student overview
    const quiz = await Quiz.findOne({ chapterId: chapter._id, publicationStatus: 'published' })
      .select('_id title version timeLimitSeconds questionCount passingScore');
    const files = await LessonFile.find({ chapterId: chapter._id }).select('-storagePath').sort({ createdAt: -1 });

    let studentProgress = null;
    if (req.user.role === 'student') {
      studentProgress = await ChapterProgress.findOne({
        studentId: req.user._id,
        chapterId: chapter._id
      });
    }

    res.json({
      success: true,
      chapter: {
        id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        description: chapter.description,
        course: chapter.courseId,
        module: chapter.moduleId,
        isPublished: chapter.isPublished
      },
      hasLesson: Boolean(lesson),
      lessonFiles: files || [],
      hasPresentation: Boolean(presentation),
      presentationSlideCount: presentation?.slides?.length || 0,
      quiz: quiz || null,
      progress: studentProgress
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Administrative override of student chapter progress
 */
const overrideChapterProgress = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { studentId, status, reason } = req.body;

    if (!studentId || !status || !reason) {
      return res.status(400).json({
        success: false,
        message: 'studentId, status (available, passed, locked), and a documented reason are required.'
      });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let progress = await ChapterProgress.findOne({ studentId, chapterId });
    const previousStatus = progress ? progress.status : 'locked';

    if (!progress) {
      progress = new ChapterProgress({
        studentId,
        courseId: chapter.courseId,
        chapterId: chapter._id,
        status,
        passedAt: status === 'passed' ? new Date() : null
      });
    } else {
      progress.status = status;
      if (status === 'passed' && !progress.passedAt) {
        progress.passedAt = new Date();
      }
    }

    await progress.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'ADMIN_PROGRESS_OVERRIDE',
      entityType: 'ChapterProgress',
      entityId: progress._id,
      details: {
        studentId,
        chapterId,
        chapterNumber: chapter.chapterNumber,
        previousStatus,
        newStatus: status,
        reason
      },
      req
    });

    res.json({
      success: true,
      message: `Progress updated to ${status} for student. Reason logged.`,
      progress
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get comprehensive chapter summary dossier (Faculty only)
 */
const getChapterSummary = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { sortBy = 'surname', sortOrder } = req.query;

    const data = await getChapterSummaryData(chapterId, { sortBy, sortOrder });

    res.json({
      success: true,
      ...data
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getChapter,
  overrideChapterProgress,
  getChapterSummary
};

