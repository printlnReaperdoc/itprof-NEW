const Course = require('../models/Course');
const Module = require('../models/Module');
const Chapter = require('../models/Chapter');
const ChapterProgress = require('../models/ChapterProgress');
const Enrollment = require('../models/Enrollment');
const QuizAttempt = require('../models/QuizAttempt');
const { initializeStudentCourseProgress } = require('../services/progress.service');

/**
 * Get all courses with student progression metrics
 */
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ courseCode: 1 });
    const isStudent = req.user && req.user.role === 'student';

    const coursesWithMetrics = await Promise.all(
      courses.map(async (course) => {
        const totalChapters = await Chapter.countDocuments({ courseId: course._id, isPublished: true });

        let chaptersPassed = 0;
        let completionPercentage = 0;
        let overallAverage = null;
        let latestActivity = null;

        if (isStudent) {
          // Initialize progress if needed
          await initializeStudentCourseProgress(req.user._id, course._id);

          const progressRecords = await ChapterProgress.find({
            studentId: req.user._id,
            courseId: course._id
          });

          const passedRecords = progressRecords.filter(p => p.status === 'passed');
          chaptersPassed = passedRecords.length;
          completionPercentage = totalChapters > 0
            ? Math.round((chaptersPassed / totalChapters) * 100 * 10) / 10
            : 0;

          // Compute average from attempted chapters only
          const attemptedRecords = progressRecords.filter(p => p.attemptsCount > 0);
          if (attemptedRecords.length > 0) {
            const sumHighest = attemptedRecords.reduce((acc, curr) => acc + (curr.highestScorePercentage || 0), 0);
            overallAverage = Math.round((sumHighest / attemptedRecords.length) * 10) / 10;
          }

          // Latest attempt
          const latestAttempt = await QuizAttempt.findOne({
            studentId: req.user._id,
            courseId: course._id,
            status: { $in: ['completed', 'timed_out'] }
          }).sort({ submittedAt: -1 });

          if (latestAttempt) {
            latestActivity = {
              attemptId: latestAttempt._id,
              submittedAt: latestAttempt.submittedAt,
              scorePercentage: latestAttempt.scorePercentage
            };
          }
        }

        return {
          id: course._id,
          courseCode: course.courseCode,
          courseTitle: course.courseTitle,
          classification: course.classification,
          academicYearLevel: course.academicYearLevel,
          term: course.term,
          academicDesignation: course.academicDesignation,
          description: course.description,
          totalChapters,
          chaptersPassed,
          completionPercentage,
          overallAverage,
          latestActivity
        };
      })
    );

    res.json({
      success: true,
      courses: coursesWithMetrics
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get single course with modules, chapters, and progress states
 */
const getCourseDetails = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const modules = await Module.find({ courseId: course._id }).sort({ moduleNumber: 1 });
    const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });

    const isStudent = req.user && req.user.role === 'student';
    let progressMap = new Map();

    if (isStudent) {
      await initializeStudentCourseProgress(req.user._id, course._id);
      const progresses = await ChapterProgress.find({
        studentId: req.user._id,
        courseId: course._id
      });
      progresses.forEach(p => progressMap.set(p.chapterId.toString(), p));
    }

    // Attach chapters to their modules
    const modulesWithChapters = modules.map((mod) => {
      const moduleChapters = chapters
        .filter(ch => ch.moduleId.toString() === mod._id.toString())
        .map(ch => {
          let status = 'available';
          let highestScore = null;
          let highestScorePercentage = null;
          let attemptsCount = 0;

          if (isStudent) {
            const prog = progressMap.get(ch._id.toString());
            status = prog ? prog.status : (ch.chapterNumber === 1 ? 'available' : 'locked');
            highestScore = prog ? prog.highestScore : null;
            highestScorePercentage = prog ? prog.highestScorePercentage : null;
            attemptsCount = prog ? prog.attemptsCount : 0;
          }

          return {
            id: ch._id,
            chapterNumber: ch.chapterNumber,
            title: ch.title,
            description: ch.description,
            status,
            highestScore,
            highestScorePercentage,
            attemptsCount
          };
        });

      return {
        id: mod._id,
        moduleNumber: mod.moduleNumber,
        title: mod.title,
        description: mod.description,
        chapters: moduleChapters
      };
    });

    res.json({
      success: true,
      course: {
        id: course._id,
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        classification: course.classification,
        academicYearLevel: course.academicYearLevel,
        term: course.term,
        academicDesignation: course.academicDesignation,
        description: course.description
      },
      modules: modulesWithChapters
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCourses,
  getCourseDetails
};

