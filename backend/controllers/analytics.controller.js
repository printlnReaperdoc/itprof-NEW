const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const ChapterProgress = require('../models/ChapterProgress');
const QuizAttempt = require('../models/QuizAttempt');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const isStudent = req.user && req.user.role === 'student';
    const isFaculty = req.user && ['faculty', 'admin'].includes(req.user.role);

    const courses = await Course.find({ isActive: true }).sort({ courseCode: 1 });

    if (isStudent) {
      // Student-specific analytics
      let totalPassedBothCourses = 0;
      let totalChaptersBothCourses = 0;

      const courseSummaries = await Promise.all(
        courses.map(async (c) => {
          const totalChapters = await Chapter.countDocuments({ courseId: c._id, isPublished: true });
          totalChaptersBothCourses += totalChapters;

          const progressList = await ChapterProgress.find({
            studentId: req.user._id,
            courseId: c._id
          });

          const passedCount = progressList.filter(p => p.status === 'passed').length;
          totalPassedBothCourses += passedCount;

          const attemptedList = progressList.filter(p => p.attemptsCount > 0);
          const attemptedCount = attemptedList.length;

          const sumScores = attemptedList.reduce((acc, curr) => acc + (curr.highestScorePercentage || 0), 0);
          const average = attemptedCount > 0 ? Math.round((sumScores / attemptedCount) * 10) / 10 : null;
          const completion = totalChapters > 0 ? Math.round((passedCount / totalChapters) * 100 * 10) / 10 : 0;

          return {
            courseId: c._id,
            courseCode: c.courseCode,
            courseTitle: c.courseTitle,
            classification: c.classification,
            academicYearLevel: c.academicYearLevel,
            term: c.term,
            totalChapters,
            chaptersPassed: passedCount,
            chaptersAttempted: attemptedCount,
            completionPercentage: completion,
            overallAverage: average
          };
        })
      );

      // Recent attempts
      const recentAttempts = await QuizAttempt.find({
        studentId: req.user._id,
        status: { $in: ['completed', 'timed_out'] }
      })
        .sort({ submittedAt: -1 })
        .limit(5)
        .populate('courseId', 'courseCode courseTitle')
        .populate('chapterId', 'chapterNumber title');

      return res.json({
        success: true,
        mode: 'student',
        combined: {
          totalPassedBothCourses,
          totalChaptersBothCourses,
          overallCompletionPercentage: totalChaptersBothCourses > 0
            ? Math.round((totalPassedBothCourses / totalChaptersBothCourses) * 100 * 10) / 10
            : 0
        },
        courses: courseSummaries,
        recentActivity: recentAttempts.map(a => ({
          attemptId: a._id,
          courseCode: a.courseId?.courseCode,
          chapterNumber: a.chapterId?.chapterNumber,
          chapterTitle: a.chapterId?.title,
          score: a.correctAnswers,
          scorePercentage: a.scorePercentage,
          isPassed: a.correctAnswers >= 15,
          submittedAt: a.submittedAt
        }))
      });
    }

    // Faculty dashboard analytics
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });

    const courseStats = await Promise.all(
      courses.map(async (c) => {
        const totalChapters = await Chapter.countDocuments({ courseId: c._id, isPublished: true });
        const enrolledCount = await Enrollment.countDocuments({ courseId: c._id, status: 'active' });

        const attempts = await QuizAttempt.find({
          courseId: c._id,
          status: { $in: ['completed', 'timed_out'] }
        });

        const totalAttempts = attempts.length;
        const passedAttempts = attempts.filter(a => a.correctAnswers >= 15).length;
        const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100 * 10) / 10 : 0;

        return {
          courseId: c._id,
          courseCode: c.courseCode,
          courseTitle: c.courseTitle,
          classification: c.classification,
          totalChapters,
          enrolledCount,
          totalAttempts,
          passRate
        };
      })
    );

    const recentActivity = await QuizAttempt.find({ status: { $in: ['completed', 'timed_out'] } })
      .sort({ submittedAt: -1 })
      .limit(10)
      .populate('studentId', 'username firstName surname')
      .populate('courseId', 'courseCode')
      .populate('chapterId', 'chapterNumber title');

    res.json({
      success: true,
      mode: 'faculty',
      summary: {
        totalStudents,
        totalFaculty,
        courses: courseStats
      },
      recentActivity: recentActivity.map(a => ({
        attemptId: a._id,
        student: `${a.studentId?.firstName} ${a.studentId?.surname} (${a.studentId?.username})`,
        courseCode: a.courseId?.courseCode,
        chapterNumber: a.chapterId?.chapterNumber,
        chapterTitle: a.chapterId?.title,
        score: a.correctAnswers,
        scorePercentage: a.scorePercentage,
        isPassed: a.correctAnswers >= 15,
        submittedAt: a.submittedAt
      }))
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardAnalytics
};

