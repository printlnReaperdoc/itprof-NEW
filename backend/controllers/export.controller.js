const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuestionOption = require('../models/QuestionOption');
const Enrollment = require('../models/Enrollment');
const ChapterProgress = require('../models/ChapterProgress');
const {
  generateMasterGradebookXLSX,
  generateMasterGradebookCSV,
  generateTopicGradebookXLSX,
  generateMasterGradebookPDF,
  generateQuizAnswerKeysPDF
} = require('../services/export.service');
const { createAuditLog } = require('../services/audit.service');

/**
 * Export Master Gradebook (Faculty only)
 */
const exportMasterGradebook = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { format = 'xlsx' } = req.query; // 'xlsx', 'csv', 'pdf'

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });
    const enrollments = await Enrollment.find({ courseId: course._id, status: 'active' })
      .populate('studentId', 'username firstName surname')
      .sort({ 'studentId.surname': 1 });

    const studentIds = enrollments.map(e => e.studentId?._id).filter(Boolean);
    const allProgress = await ChapterProgress.find({ courseId: course._id, studentId: { $in: studentIds } });

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
      const s = enr.studentId;
      if (!s) return;
      const sId = s._id.toString();
      students.push(s);

      let chaptersAttempted = 0;
      let chaptersPassed = 0;
      let sumPercentages = 0;
      const studentChapters = {};

      chapters.forEach(ch => {
        const prog = progressMatrix[sId]?.[ch._id.toString()];
        if (prog && prog.attemptsCount > 0) {
          chaptersAttempted += 1;
          sumPercentages += (prog.highestScorePercentage || 0);
          if (prog.status === 'passed') chaptersPassed += 1;
          studentChapters[ch._id.toString()] = {
            highestScore: prog.highestScore,
            status: prog.status,
            attemptsCount: prog.attemptsCount
          };
        } else {
          studentChapters[ch._id.toString()] = {
            highestScore: null,
            status: 'locked',
            attemptsCount: 0
          };
        }
      });

      const overallAverage = chaptersAttempted > 0
        ? Math.round((sumPercentages / chaptersAttempted) * 10) / 10
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

    // Audit log
    await createAuditLog({
      actorUserId: req.user._id,
      action: 'EXPORT_MASTER_GRADEBOOK',
      entityType: 'Course',
      entityId: course._id,
      details: { format, courseCode: course.courseCode },
      req
    });

    if (format === 'csv') {
      const buffer = await generateMasterGradebookCSV({ course, students, chapters, gradeMatrix });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${course.courseCode}_Master_Gradebook.csv"`);
      return res.send(buffer);
    } else if (format === 'pdf') {
      const buffer = await generateMasterGradebookPDF({ course, students, chapters, gradeMatrix });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${course.courseCode}_Master_Gradebook.pdf"`);
      return res.send(buffer);
    } else {
      // Default to XLSX
      const buffer = await generateMasterGradebookXLSX({ course, students, chapters, gradeMatrix });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${course.courseCode}_Master_Gradebook.xlsx"`);
      return res.send(buffer);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Export Topic Gradebook (Faculty only)
 */
const exportTopicGradebook = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { format = 'xlsx' } = req.query;

    const chapter = await Chapter.findById(chapterId).populate('courseId');
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    const enrollments = await Enrollment.find({ courseId: chapter.courseId._id, status: 'active' })
      .populate('studentId', 'username firstName surname')
      .sort({ 'studentId.surname': 1 });

    const studentIds = enrollments.map(e => e.studentId?._id).filter(Boolean);
    const progresses = await ChapterProgress.find({ chapterId: chapter._id, studentId: { $in: studentIds } });
    const progressMap = new Map();
    progresses.forEach(p => progressMap.set(p.studentId.toString(), p));

    const records = enrollments.map(enr => {
      const s = enr.studentId;
      if (!s) return null;
      const prog = progressMap.get(s._id.toString());
      return {
        username: s.username,
        surname: s.surname,
        firstName: s.firstName,
        attemptsCount: prog?.attemptsCount ?? 0,
        latestScore: prog?.highestScore ?? null,
        highestScore: prog?.highestScore ?? null,
        highestScorePercentage: prog?.highestScorePercentage ?? null,
        isPassed: prog?.status === 'passed',
        latestAttemptAt: prog?.latestAttemptAt || null,
        status: prog?.status || 'locked'
      };
    }).filter(Boolean);

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'EXPORT_TOPIC_GRADEBOOK',
      entityType: 'Chapter',
      entityId: chapter._id,
      details: { format, chapterNumber: chapter.chapterNumber },
      req
    });

    const buffer = await generateTopicGradebookXLSX({ course: chapter.courseId, chapter, records });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Chapter_${chapter.chapterNumber}_Gradebook.xlsx"`);
    return res.send(buffer);
  } catch (err) {
    next(err);
  }
};

/**
 * Export Quiz Answer Keys as PDF (Faculty only)
 */
const exportQuizAnswerKeysPDF = async (req, res, next) => {
  try {
    const { courseId } = req.query;

    const courseFilter = courseId ? { _id: courseId } : {};
    const courses = await Course.find(courseFilter).sort({ courseCode: 1 });

    const coursesData = [];

    for (const course of courses) {
      const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });
      const chapterIds = chapters.map(c => c._id);

      const quizzes = await Quiz.find({ chapterId: { $in: chapterIds }, publicationStatus: 'published' }).sort({ version: -1 });

      const quizByChapter = new Map();
      quizzes.forEach(q => {
        const cId = q.chapterId.toString();
        if (!quizByChapter.has(cId)) {
          quizByChapter.set(cId, q);
        }
      });

      const activeQuizzes = Array.from(quizByChapter.values());
      const quizIds = activeQuizzes.map(q => q._id);

      const questions = await Question.find({ quizId: { $in: quizIds } }).sort({ position: 1 });
      const questionIds = questions.map(q => q._id);
      const options = await QuestionOption.find({ questionId: { $in: questionIds } }).sort({ optionLabel: 1 });

      const optionsByQuestion = new Map();
      options.forEach(opt => {
        const qId = opt.questionId.toString();
        if (!optionsByQuestion.has(qId)) optionsByQuestion.set(qId, []);
        optionsByQuestion.get(qId).push(opt);
      });

      const questionsByQuiz = new Map();
      questions.forEach(q => {
        const qzId = q.quizId.toString();
        if (!questionsByQuiz.has(qzId)) questionsByQuiz.set(qzId, []);

        const qOpts = optionsByQuestion.get(q._id.toString()) || [];
        const correctOpt = qOpts.find(o => o.isCorrect);

        questionsByQuiz.get(qzId).push({
          id: q._id,
          position: q.position,
          questionText: q.questionText,
          points: q.points,
          correctOption: correctOpt ? correctOpt.optionLabel : null,
          options: qOpts.map(o => ({
            id: o._id,
            label: o.optionLabel,
            optionText: o.optionText,
            isCorrect: o.isCorrect
          }))
        });
      });

      const chapterList = [];
      for (const chapter of chapters) {
        const quiz = quizByChapter.get(chapter._id.toString());
        const quizQuestions = quiz ? (questionsByQuiz.get(quiz._id.toString()) || []) : [];

        chapterList.push({
          id: chapter._id,
          chapterNumber: chapter.chapterNumber,
          title: chapter.title,
          description: chapter.description,
          quiz: quiz ? {
            id: quiz._id,
            title: quiz.title,
            version: quiz.version,
            passingScore: quiz.passingScore,
            questionCount: quiz.questionCount,
            questions: quizQuestions
          } : null
        });
      }

      coursesData.push({
        id: course._id,
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        academicYearLevel: course.academicYearLevel,
        term: course.term,
        chapters: chapterList
      });
    }

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'EXPORT_QUIZ_ANSWER_KEYS_PDF',
      entityType: 'Quiz',
      details: {
        courseId: courseId || 'ALL',
        coursesCount: coursesData.length
      },
      req
    });

    const pdfBuffer = await generateQuizAnswerKeysPDF({
      coursesData,
      requestedBy: req.user
    });

    const filename = courseId && courses.length === 1
      ? `${courses[0].courseCode}_Quiz_Answer_Keys.pdf`
      : 'IT_Prof_Electives_Master_Quiz_Answer_Keys.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  exportMasterGradebook,
  exportTopicGradebook,
  exportQuizAnswerKeysPDF
};

