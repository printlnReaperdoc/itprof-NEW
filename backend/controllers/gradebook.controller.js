const User = require('../models/User');
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const ChapterProgress = require('../models/ChapterProgress');
const QuizAttempt = require('../models/QuizAttempt');
const Enrollment = require('../models/Enrollment');

/**
 * Get Topic-Level Gradebook for a specific chapter (Faculty only)
 */
const getTopicGradebook = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { sortBy = 'surname', sortOrder = 'asc', filterStatus = 'all', search = '' } = req.query;

    const chapter = await Chapter.findById(chapterId)
      .populate('courseId', 'courseCode courseTitle classification');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    // Get all enrolled students for this course
    const enrollments = await Enrollment.find({ courseId: chapter.courseId._id, status: 'active' })
      .populate('studentId', 'username firstName surname isActive');

    const studentIds = enrollments.map(e => e.studentId?._id).filter(Boolean);

    // Get progress records for this chapter
    const progressRecords = await ChapterProgress.find({
      chapterId: chapter._id,
      studentId: { $in: studentIds }
    });
    const progressMap = new Map();
    progressRecords.forEach(p => progressMap.set(p.studentId.toString(), p));

    // Get latest quiz attempts for this chapter
    const latestAttempts = await QuizAttempt.aggregate([
      { $match: { chapterId: chapter._id, studentId: { $in: studentIds } } },
      { $sort: { submittedAt: -1 } },
      {
        $group: {
          _id: '$studentId',
          latestScore: { $first: '$correctAnswers' },
          latestScorePercentage: { $first: '$scorePercentage' },
          latestAttemptAt: { $first: '$submittedAt' },
          totalAttempts: { $sum: 1 }
        }
      }
    ]);
    const attemptMap = new Map();
    latestAttempts.forEach(a => attemptMap.set(a._id.toString(), a));

    let rows = enrollments.map(enr => {
      const student = enr.studentId;
      if (!student) return null;

      const sId = student._id.toString();
      const prog = progressMap.get(sId);
      const att = attemptMap.get(sId);

      const attemptsCount = prog?.attemptsCount || att?.totalAttempts || 0;
      const highestScore = prog?.highestScore ?? null;
      const highestScorePercentage = prog?.highestScorePercentage ?? null;
      const latestScore = att?.latestScore ?? null;
      const latestScorePercentage = att?.latestScorePercentage ?? null;
      const latestAttemptAt = prog?.latestAttemptAt || att?.latestAttemptAt || null;
      const status = prog?.status || 'locked';
      const isPassed = status === 'passed';

      return {
        studentId: student._id,
        username: student.username,
        firstName: student.firstName,
        surname: student.surname,
        attemptsCount,
        latestScore,
        latestScorePercentage,
        highestScore,
        highestScorePercentage,
        latestAttemptAt,
        status,
        isPassed
      };
    }).filter(Boolean);

    // Search filter
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      rows = rows.filter(r =>
        r.username.toLowerCase().includes(term) ||
        r.firstName.toLowerCase().includes(term) ||
        r.surname.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filterStatus === 'passed') {
      rows = rows.filter(r => r.isPassed);
    } else if (filterStatus === 'failed') {
      rows = rows.filter(r => !r.isPassed && r.attemptsCount > 0);
    } else if (filterStatus === 'not_attempted') {
      rows = rows.filter(r => r.attemptsCount === 0);
    }

    // Server-side sort
    const validSortFields = ['surname', 'username', 'highestScore', 'latestAttemptAt', 'attemptsCount'];
    const activeSortBy = validSortFields.includes(sortBy) ? sortBy : 'surname';
    const direction = sortOrder === 'desc' ? -1 : 1;

    rows.sort((a, b) => {
      let valA = a[activeSortBy];
      let valB = b[activeSortBy];

      if (valA === null || valA === undefined) valA = direction === 1 ? Infinity : -Infinity;
      if (valB === null || valB === undefined) valB = direction === 1 ? Infinity : -Infinity;

      if (typeof valA === 'string') {
        return direction * valA.localeCompare(valB);
      }
      return direction * (valA > valB ? 1 : valA < valB ? -1 : 0);
    });

    res.json({
      success: true,
      chapter: {
        id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        course: chapter.courseId
      },
      totalStudents: rows.length,
      records: rows
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Course-Wide Master Gradebook (Faculty only)
 */
const getMasterGradebook = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const chapters = await Chapter.find({ courseId: course._id, isPublished: true })
      .sort({ chapterNumber: 1 });

    const enrollments = await Enrollment.find({ courseId: course._id, status: 'active' })
      .populate('studentId', 'username firstName surname isActive')
      .sort({ 'studentId.surname': 1 });

    const studentIds = enrollments.map(e => e.studentId?._id).filter(Boolean);

    // Fetch all progress records for enrolled students in this course
    const allProgress = await ChapterProgress.find({
      courseId: course._id,
      studentId: { $in: studentIds }
    });

    const progressMatrix = {};
    allProgress.forEach(p => {
      const sId = p.studentId.toString();
      const chId = p.chapterId.toString();
      if (!progressMatrix[sId]) progressMatrix[sId] = {};
      progressMatrix[sId][chId] = p;
    });

    const students = [];
    const gradeMatrix = {};

    enrollments.forEach(enr => {
      const student = enr.studentId;
      if (!student) return;

      const sId = student._id.toString();
      students.push({
        _id: student._id,
        username: student.username,
        firstName: student.firstName,
        surname: student.surname
      });

      const studentChapters = {};
      let chaptersAttempted = 0;
      let chaptersPassed = 0;
      let scorePercentagesSum = 0;

      chapters.forEach(ch => {
        const prog = progressMatrix[sId]?.[ch._id.toString()];
        if (prog && prog.attemptsCount > 0) {
          chaptersAttempted += 1;
          scorePercentagesSum += (prog.highestScorePercentage || 0);

          if (prog.status === 'passed') {
            chaptersPassed += 1;
          }

          studentChapters[ch._id.toString()] = {
            highestScore: prog.highestScore,
            highestScorePercentage: prog.highestScorePercentage,
            attemptsCount: prog.attemptsCount,
            status: prog.status,
            passedAt: prog.passedAt
          };
        } else {
          studentChapters[ch._id.toString()] = {
            highestScore: null,
            highestScorePercentage: null,
            attemptsCount: 0,
            status: prog ? prog.status : 'locked',
            passedAt: null
          };
        }
      });

      const overallAverage = chaptersAttempted > 0
        ? Math.round((scorePercentagesSum / chaptersAttempted) * 10) / 10
        : null;

      const completionPercentage = chapters.length > 0
        ? Math.round((chaptersPassed / chapters.length) * 100 * 10) / 10
        : 0;

      gradeMatrix[sId] = {
        chapters: studentChapters,
        chaptersAttempted,
        chaptersPassed,
        overallAverage,
        completionPercentage
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
        academicDesignation: course.academicDesignation
      },
      chapters: chapters.map(ch => ({
        id: ch._id,
        chapterNumber: ch.chapterNumber,
        title: ch.title
      })),
      students,
      gradeMatrix
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Student Self-Gradebook & History
 */
const getStudentGradebook = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const courses = await Course.find({ isActive: true }).sort({ courseCode: 1 });

    const report = await Promise.all(
      courses.map(async (course) => {
        const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });
        const chapterIds = chapters.map(c => c._id);

        const progressRecords = await ChapterProgress.find({
          studentId,
          courseId: course._id
        });
        const progressMap = new Map();
        progressRecords.forEach(p => progressMap.set(p.chapterId.toString(), p));

        const attempts = await QuizAttempt.find({
          studentId,
          courseId: course._id,
          status: { $in: ['completed', 'timed_out'] }
        }).sort({ submittedAt: -1 });

        const attemptsByChapter = {};
        attempts.forEach(a => {
          const chId = a.chapterId.toString();
          if (!attemptsByChapter[chId]) attemptsByChapter[chId] = [];
          attemptsByChapter[chId].push({
            id: a._id,
            quizVersion: a.quizVersion,
            correctAnswers: a.correctAnswers,
            scorePercentage: a.scorePercentage,
            submittedAt: a.submittedAt,
            status: a.status
          });
        });

        let chaptersPassed = 0;
        let chaptersAttempted = 0;
        let sumHighest = 0;

        const chapterList = chapters.map(ch => {
          const prog = progressMap.get(ch._id.toString());
          const atts = attemptsByChapter[ch._id.toString()] || [];

          if (prog && prog.attemptsCount > 0) {
            chaptersAttempted += 1;
            sumHighest += (prog.highestScorePercentage || 0);
          }
          if (prog && prog.status === 'passed') {
            chaptersPassed += 1;
          }

          return {
            chapterId: ch._id,
            chapterNumber: ch.chapterNumber,
            title: ch.title,
            status: prog ? prog.status : (ch.chapterNumber === 1 ? 'available' : 'locked'),
            highestScore: prog?.highestScore ?? null,
            highestScorePercentage: prog?.highestScorePercentage ?? null,
            attemptsCount: prog?.attemptsCount || atts.length,
            passedAt: prog?.passedAt || null,
            attempts: atts
          };
        });

        const overallAverage = chaptersAttempted > 0
          ? Math.round((sumHighest / chaptersAttempted) * 10) / 10
          : null;

        const completionPercentage = chapters.length > 0
          ? Math.round((chaptersPassed / chapters.length) * 100 * 10) / 10
          : 0;

        return {
          course: {
            id: course._id,
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            classification: course.classification
          },
          chaptersPassed,
          totalChapters: chapters.length,
          completionPercentage,
          overallAverage,
          chapters: chapterList
        };
      })
    );

    res.json({
      success: true,
      student: {
        id: req.user._id,
        username: req.user.username,
        fullName: `${req.user.firstName} ${req.user.surname}`
      },
      courses: report
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTopicGradebook,
  getMasterGradebook,
  getStudentGradebook
};

