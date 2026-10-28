const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuestionOption = require('../models/QuestionOption');
const Chapter = require('../models/Chapter');
const Course = require('../models/Course');
const { canAccessChapter } = require('../services/progress.service');
const { validateQuestionsArray, parseSpreadsheetQuestions } = require('../services/quiz-import.service');
const { createAuditLog } = require('../services/audit.service');

/**
 * Get quiz for a chapter
 */
const getQuizByChapter = async (req, res, next) => {
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

    const quiz = await Quiz.findOne({ chapterId }).sort({ version: -1 });
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found for this chapter' });
    }

    const isFaculty = ['faculty', 'admin'].includes(req.user.role);

    // If faculty, can load full questions with answer keys
    let questionsData = [];
    if (isFaculty) {
      const questions = await Question.find({ quizId: quiz._id }).sort({ position: 1 });
      const questionIds = questions.map(q => q._id);
      const options = await QuestionOption.find({ questionId: { $in: questionIds } }).sort({ optionLabel: 1 });

      const optionMap = new Map();
      options.forEach(opt => {
        const qId = opt.questionId.toString();
        if (!optionMap.has(qId)) optionMap.set(qId, []);
        optionMap.get(qId).push(opt);
      });

      questionsData = questions.map(q => ({
        id: q._id,
        position: q.position,
        questionText: q.questionText,
        points: q.points,
        options: optionMap.get(q._id.toString()) || []
      }));
    }

    res.json({
      success: true,
      quiz: {
        id: quiz._id,
        courseId: quiz.courseId,
        chapterId: quiz.chapterId,
        title: quiz.title,
        version: quiz.version,
        timeLimitSeconds: quiz.timeLimitSeconds,
        questionCount: quiz.questionCount,
        passingScore: quiz.passingScore,
        publicationStatus: quiz.publicationStatus,
        publishedAt: quiz.publishedAt
      },
      questions: isFaculty ? questionsData : undefined
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Import or Replace Quiz Questions (Faculty only)
 */
const importQuizQuestions = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { chapterId } = req.params;
    let questionsToImport = [];

    if (req.file) {
      // CSV or XLSX file uploaded
      const validation = await parseSpreadsheetQuestions(req.file.path);
      if (!validation.isValid) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: 'Spreadsheet validation failed',
          errors: validation.errors
        });
      }
      questionsToImport = validation.questions;
    } else if (req.body.questions) {
      // JSON array of questions
      const validation = validateQuestionsArray(req.body.questions, 20);
      if (!validation.isValid) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: 'Quiz questions validation failed',
          errors: validation.errors
        });
      }
      questionsToImport = validation.questions;
    } else {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'No questions or file provided. Provide a JSON array or upload a CSV/XLSX file.'
      });
    }

    const chapter = await Chapter.findById(chapterId).session(session);
    if (!chapter) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let existingQuiz = await Quiz.findOne({ chapterId }).sort({ version: -1 }).session(session);
    let quiz;

    if (!existingQuiz) {
      quiz = new Quiz({
        courseId: chapter.courseId,
        chapterId: chapter._id,
        title: `${chapter.title} Assessment`,
        version: 1,
        timeLimitSeconds: 600,
        questionCount: questionsToImport.length,
        passingScore: 15,
        publicationStatus: 'published',
        createdBy: req.user._id,
        publishedAt: new Date()
      });
      await quiz.save({ session });
    } else {
      // Increment version to preserve historical quiz versions for past student attempts!
      quiz = new Quiz({
        courseId: chapter.courseId,
        chapterId: chapter._id,
        title: existingQuiz.title,
        version: existingQuiz.version + 1,
        timeLimitSeconds: existingQuiz.timeLimitSeconds,
        questionCount: questionsToImport.length,
        passingScore: existingQuiz.passingScore,
        publicationStatus: 'published',
        createdBy: req.user._id,
        publishedAt: new Date()
      });
      await quiz.save({ session });
    }

    // Insert questions and options
    for (const qData of questionsToImport) {
      const question = new Question({
        quizId: quiz._id,
        questionText: qData.questionText,
        points: qData.points || 1,
        position: qData.position
      });
      await question.save({ session });

      const optionsToInsert = qData.options.map(opt => ({
        questionId: question._id,
        optionLabel: opt.optionLabel,
        optionText: opt.optionText,
        isCorrect: opt.isCorrect
      }));

      await QuestionOption.insertMany(optionsToInsert, { session });
    }

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'QUIZ_QUESTIONS_IMPORTED',
      entityType: 'Quiz',
      entityId: quiz._id,
      details: {
        chapterId,
        version: quiz.version,
        questionCount: questionsToImport.length
      },
      req,
      session
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: `Successfully imported ${questionsToImport.length} questions into Quiz v${quiz.version}`,
      quizId: quiz._id,
      version: quiz.version
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

/**
 * Get all quiz answer keys for Faculty and Admin
 */
const getAllQuizAnswerKeys = async (req, res, next) => {
  try {
    const { courseId } = req.query;

    const courseFilter = courseId ? { _id: courseId } : {};
    const courses = await Course.find(courseFilter).sort({ courseCode: 1 });

    const coursesData = [];
    let totalQuestionsCount = 0;
    let totalQuizzesCount = 0;

    for (const course of courses) {
      const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });
      const chapterIds = chapters.map(c => c._id);

      // Find published quizzes for these chapters
      const quizzes = await Quiz.find({ chapterId: { $in: chapterIds }, publicationStatus: 'published' }).sort({ version: -1 });

      // Group quizzes by chapterId, picking highest version
      const quizByChapter = new Map();
      quizzes.forEach(q => {
        const cId = q.chapterId.toString();
        if (!quizByChapter.has(cId)) {
          quizByChapter.set(cId, q);
        }
      });

      const activeQuizzes = Array.from(quizByChapter.values());
      const quizIds = activeQuizzes.map(q => q._id);

      // Fetch questions and options
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
            text: o.optionText,
            isCorrect: o.isCorrect
          }))
        });
      });

      const chapterList = [];
      for (const chapter of chapters) {
        const quiz = quizByChapter.get(chapter._id.toString());
        const quizQuestions = quiz ? (questionsByQuiz.get(quiz._id.toString()) || []) : [];

        if (quiz) {
          totalQuizzesCount += 1;
          totalQuestionsCount += quizQuestions.length;
        }

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
        academicDesignation: course.academicDesignation,
        chapters: chapterList
      });
    }

    res.json({
      success: true,
      totalQuizzes: totalQuizzesCount,
      totalQuestions: totalQuestionsCount,
      courses: coursesData
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getQuizByChapter,
  importQuizQuestions,
  getAllQuizAnswerKeys
};

