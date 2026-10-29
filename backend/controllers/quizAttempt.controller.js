const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuestionOption = require('../models/QuestionOption');
const QuizAttempt = require('../models/QuizAttempt');
const AttemptAnswer = require('../models/AttemptAnswer');
const Chapter = require('../models/Chapter');
const { canAccessChapter } = require('../services/progress.service');
const { gradeAttempt } = require('../services/grading.service');
const { createAuditLog } = require('../services/audit.service');

/**
 * Start or resume a quiz attempt
 */
const startAttempt = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    // Faculty and administrators cannot take student quizzes
    if (['faculty', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Faculty members cannot take student assessment quizzes. As faculty, you can manage quiz questions and review student gradebooks.',
        code: 'FACULTY_CANNOT_TAKE_QUIZ'
      });
    }

    // Verify student is permitted to access this chapter
    const accessCheck = await canAccessChapter(req.user, chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked. Pass previous chapters first.',
        code: 'CHAPTER_LOCKED'
      });
    }

    // Find the published quiz
    const quiz = await Quiz.findOne({ chapterId, publicationStatus: 'published' }).sort({ version: -1 });
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'No published quiz found for this chapter' });
    }

    const now = new Date();

    // Check for an existing in_progress attempt
    const existingAttempt = await QuizAttempt.findOne({
      studentId: req.user._id,
      chapterId,
      status: 'in_progress'
    });

    if (existingAttempt) {
      // Check if deadline has passed
      if (new Date(existingAttempt.deadlineAt).getTime() < now.getTime()) {
        // Auto-finalize past attempt as timed out
        await gradeAttempt({
          attemptId: existingAttempt._id,
          submissionType: 'auto_timeout',
          req
        });
        // Proceed to create a fresh attempt below
      } else {
        // Resume existing active attempt
        return returnAttemptWithQuestions(existingAttempt, quiz, res);
      }
    }

    // Create a new attempt
    const timeLimitSec = quiz.timeLimitSeconds || 600;
    const deadlineAt = new Date(now.getTime() + timeLimitSec * 1000);

    const newAttempt = new QuizAttempt({
      studentId: req.user._id,
      courseId: quiz.courseId,
      chapterId: quiz.chapterId,
      quizId: quiz._id,
      quizVersion: quiz.version,
      startedAt: now,
      deadlineAt,
      status: 'in_progress',
      submissionType: 'manual'
    });

    await newAttempt.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: 'QUIZ_ATTEMPT_STARTED',
      entityType: 'QuizAttempt',
      entityId: newAttempt._id,
      details: {
        chapterId,
        quizId: quiz._id,
        version: quiz.version,
        timeLimitSeconds: timeLimitSec
      },
      req
    });

    return returnAttemptWithQuestions(newAttempt, quiz, res);
  } catch (err) {
    next(err);
  }
};

/**
 * Helper to fetch questions, strip isCorrect, and return attempt payload
 */
const returnAttemptWithQuestions = async (attempt, quiz, res) => {
  const questions = await Question.find({ quizId: quiz._id }).sort({ position: 1 });
  const questionIds = questions.map(q => q._id);

  // Fetch options WITHOUT returning isCorrect
  const options = await QuestionOption.find({ questionId: { $in: questionIds } })
    .select('_id questionId optionLabel optionText') // STRIP isCorrect
    .sort({ optionLabel: 1 });

  const optionMap = new Map();
  options.forEach(opt => {
    const qId = opt.questionId.toString();
    if (!optionMap.has(qId)) optionMap.set(qId, []);
    optionMap.get(qId).push({
      id: opt._id,
      optionLabel: opt.optionLabel,
      optionText: opt.optionText
    });
  });

  // Fetch student's existing answers for this attempt
  const savedAnswers = await AttemptAnswer.find({ attemptId: attempt._id });
  const answersMap = {};
  savedAnswers.forEach(ans => {
    if (ans.selectedOptionId) {
      answersMap[ans.questionId.toString()] = ans.selectedOptionId.toString();
    }
  });

  const formattedQuestions = questions.map(q => ({
    id: q._id,
    position: q.position,
    questionText: q.questionText,
    points: q.points,
    options: optionMap.get(q._id.toString()) || []
  }));

  const remainingSeconds = Math.max(0, Math.floor((new Date(attempt.deadlineAt).getTime() - Date.now()) / 1000));

  return res.json({
    success: true,
    attempt: {
      id: attempt._id,
      startedAt: attempt.startedAt,
      deadlineAt: attempt.deadlineAt,
      timeLimitSeconds: quiz.timeLimitSeconds,
      remainingSeconds,
      quizTitle: quiz.title,
      questionCount: formattedQuestions.length
    },
    questions: formattedQuestions,
    savedAnswers
  });
};

/**
 * Save an answer during an active quiz attempt
 */
const saveAnswer = async (req, res, next) => {
  try {
    if (['faculty', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Faculty members cannot submit quiz answers.',
        code: 'FACULTY_CANNOT_TAKE_QUIZ'
      });
    }

    const { attemptId } = req.params;
    const { questionId, selectedOptionId } = req.body;

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      studentId: req.user._id
    });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found' });
    }

    if (attempt.status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'This attempt is no longer active and cannot be modified.',
        code: 'ATTEMPT_CLOSED'
      });
    }

    // Server-enforced deadline (+10 seconds grace for network latency)
    const now = Date.now();
    const deadline = new Date(attempt.deadlineAt).getTime();
    if (now > deadline + 10000) {
      // Auto-submit due to timeout
      const result = await gradeAttempt({
        attemptId: attempt._id,
        submissionType: 'auto_timeout',
        req
      });

      return res.status(400).json({
        success: false,
        message: 'Quiz time limit expired. Attempt has been auto-submitted.',
        code: 'TIME_EXPIRED',
        result
      });
    }

    // Save answer
    await AttemptAnswer.findOneAndUpdate(
      { attemptId: attempt._id, questionId },
      { selectedOptionId, answeredAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Answer saved'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Submit quiz attempt for final server-side grading
 */
const submitAttempt = async (req, res, next) => {
  try {
    if (['faculty', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Faculty members cannot submit quiz attempts.',
        code: 'FACULTY_CANNOT_TAKE_QUIZ'
      });
    }

    const { attemptId } = req.params;

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      studentId: req.user._id
    });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found' });
    }

    if (attempt.status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'Attempt has already been submitted and graded.',
        code: 'ALREADY_SUBMITTED'
      });
    }

    const now = Date.now();
    const deadline = new Date(attempt.deadlineAt).getTime();
    const submissionType = now > deadline + 10000 ? 'auto_timeout' : 'manual';

    const gradingResult = await gradeAttempt({
      attemptId: attempt._id,
      submissionType,
      req
    });

    res.json({
      success: true,
      message: gradingResult.isPassed
        ? `Congratulations! You passed with ${gradingResult.correctCount}/${gradingResult.totalQuestions} (${gradingResult.scorePercentage}%).`
        : `Assessment incomplete. You scored ${gradingResult.correctCount}/${gradingResult.totalQuestions} (${gradingResult.scorePercentage}%). Minimum 15/20 (75%) required to pass. You may retake this quiz.`,
      result: {
        attemptId: gradingResult.attempt._id,
        correctAnswers: gradingResult.correctCount,
        totalQuestions: gradingResult.totalQuestions,
        scorePercentage: gradingResult.scorePercentage,
        isPassed: gradingResult.isPassed,
        submittedAt: gradingResult.attempt.submittedAt,
        nextChapterUnlocked: gradingResult.nextChapterUnlocked ? {
          id: gradingResult.nextChapterUnlocked._id,
          chapterNumber: gradingResult.nextChapterUnlocked.chapterNumber,
          title: gradingResult.nextChapterUnlocked.title
        } : null
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Review a past quiz attempt (Student can review their own; Faculty can review any)
 */
const getAttemptReview = async (req, res, next) => {
  try {
    const { attemptId } = req.params;

    const attempt = await QuizAttempt.findById(attemptId)
      .populate('courseId', 'courseCode courseTitle')
      .populate('chapterId', 'chapterNumber title')
      .populate('studentId', 'username firstName surname');

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Quiz attempt not found' });
    }

    const isOwner = req.user.role === 'student' && attempt.studentId._id.toString() === req.user._id.toString();
    const isFaculty = ['faculty', 'admin'].includes(req.user.role);

    if (!isOwner && !isFaculty) {
      return res.status(403).json({ success: false, message: 'Access denied to this attempt review' });
    }

    // Load questions and options with isCorrect
    const questions = await Question.find({ quizId: attempt.quizId }).sort({ position: 1 });
    const questionIds = questions.map(q => q._id);
    const options = await QuestionOption.find({ questionId: { $in: questionIds } }).sort({ optionLabel: 1 });

    const optionMap = new Map();
    options.forEach(opt => {
      const qId = opt.questionId.toString();
      if (!optionMap.has(qId)) optionMap.set(qId, []);
      optionMap.get(qId).push({
        id: opt._id,
        optionLabel: opt.optionLabel,
        optionText: opt.optionText,
        isCorrect: opt.isCorrect
      });
    });

    const studentAnswers = await AttemptAnswer.find({ attemptId: attempt._id });
    const answerMap = new Map();
    studentAnswers.forEach(ans => {
      answerMap.set(ans.questionId.toString(), {
        selectedOptionId: ans.selectedOptionId ? ans.selectedOptionId.toString() : null,
        isCorrect: ans.isCorrect
      });
    });

    const reviewQuestions = questions.map(q => {
      const qIdStr = q._id.toString();
      const ansInfo = answerMap.get(qIdStr) || { selectedOptionId: null, isCorrect: false };
      return {
        id: q._id,
        position: q.position,
        questionText: q.questionText,
        points: q.points,
        options: optionMap.get(qIdStr) || [],
        selectedOptionId: ansInfo.selectedOptionId,
        isCorrect: ansInfo.isCorrect
      };
    });

    res.json({
      success: true,
      review: {
        attemptId: attempt._id,
        student: {
          username: attempt.studentId.username,
          fullName: `${attempt.studentId.firstName} ${attempt.studentId.surname}`
        },
        course: attempt.courseId,
        chapter: attempt.chapterId,
        quizVersion: attempt.quizVersion,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        correctAnswers: attempt.correctAnswers,
        scorePercentage: attempt.scorePercentage,
        isPassed: attempt.correctAnswers >= 15,
        submissionType: attempt.submissionType,
        questions: reviewQuestions
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  startAttempt,
  saveAnswer,
  submitAttempt,
  getAttemptReview
};

