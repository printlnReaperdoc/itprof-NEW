const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuestionOption = require('../models/QuestionOption');
const QuizAttempt = require('../models/QuizAttempt');
const AttemptAnswer = require('../models/AttemptAnswer');
const { handleQuizAttemptResult } = require('./progress.service');
const { createAuditLog } = require('./audit.service');

/**
 * Grade a quiz attempt
 */
const gradeAttempt = async ({
  attemptId,
  submissionType = 'manual',
  req = null
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const attempt = await QuizAttempt.findById(attemptId).session(session);
    if (!attempt) {
      throw new Error('Quiz attempt not found');
    }

    if (attempt.status !== 'in_progress') {
      await session.abortTransaction();
      session.endSession();
      return {
        alreadyGraded: true,
        attempt
      };
    }

    const quiz = await Quiz.findById(attempt.quizId).session(session);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Fetch all questions for this quiz
    const questions = await Question.find({ quizId: quiz._id })
      .sort({ position: 1 })
      .session(session);

    // Fetch all options with correct answer flag
    const questionIds = questions.map(q => q._id);
    const correctOptions = await QuestionOption.find({
      questionId: { $in: questionIds },
      isCorrect: true
    }).session(session);

    const correctOptionMap = new Map();
    correctOptions.forEach(opt => {
      correctOptionMap.set(opt.questionId.toString(), opt._id.toString());
    });

    // Fetch student's submitted answers
    const studentAnswers = await AttemptAnswer.find({ attemptId: attempt._id }).session(session);
    const studentAnswerMap = new Map();
    studentAnswers.forEach(ans => {
      if (ans.selectedOptionId) {
        studentAnswerMap.set(ans.questionId.toString(), ans.selectedOptionId.toString());
      }
    });

    let correctCount = 0;
    const answerUpdates = [];

    for (const q of questions) {
      const qIdStr = q._id.toString();
      const studentSelectedOptionId = studentAnswerMap.get(qIdStr);
      const correctOptionId = correctOptionMap.get(qIdStr);

      const isAnswerCorrect = Boolean(studentSelectedOptionId && studentSelectedOptionId === correctOptionId);
      if (isAnswerCorrect) {
        correctCount += 1;
      }

      // Upsert/update the AttemptAnswer record
      const existingAnswer = studentAnswers.find(a => a.questionId.toString() === qIdStr);
      if (existingAnswer) {
        existingAnswer.isCorrect = isAnswerCorrect;
        answerUpdates.push(existingAnswer.save({ session }));
      } else {
        const newAns = new AttemptAnswer({
          attemptId: attempt._id,
          questionId: q._id,
          selectedOptionId: null,
          isCorrect: false,
          answeredAt: new Date()
        });
        answerUpdates.push(newAns.save({ session }));
      }
    }

    await Promise.all(answerUpdates);

    const totalQuestions = quiz.questionCount || 20;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100 * 100) / 100;
    const isPassed = correctCount >= (quiz.passingScore || 15);

    // Update QuizAttempt
    attempt.correctAnswers = correctCount;
    attempt.scorePercentage = scorePercentage;
    attempt.status = submissionType === 'auto_timeout' ? 'timed_out' : 'completed';
    attempt.submissionType = submissionType;
    attempt.submittedAt = new Date();
    await attempt.save({ session });

    // Update chapter progress and unlock next chapter if passed
    const { progress, nextChapterUnlocked } = await handleQuizAttemptResult({
      studentId: attempt.studentId,
      courseId: attempt.courseId,
      chapterId: attempt.chapterId,
      score: correctCount,
      scorePercentage,
      isPassed,
      session,
      req
    });

    // Create Audit Log
    await createAuditLog({
      actorUserId: attempt.studentId,
      action: 'QUIZ_SUBMITTED',
      entityType: 'QuizAttempt',
      entityId: attempt._id,
      details: {
        courseId: attempt.courseId,
        chapterId: attempt.chapterId,
        quizId: attempt.quizId,
        correctAnswers: correctCount,
        totalQuestions,
        scorePercentage,
        isPassed,
        submissionType,
        unlockedNextChapterId: nextChapterUnlocked ? nextChapterUnlocked._id : null
      },
      req,
      session
    });

    await session.commitTransaction();
    session.endSession();

    return {
      attempt,
      correctCount,
      totalQuestions,
      scorePercentage,
      isPassed,
      nextChapterUnlocked,
      progress
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = {
  gradeAttempt
};

