const Chapter = require('../models/Chapter');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Presentation = require('../models/Presentation');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuestionOption = require('../models/QuestionOption');
const LessonFile = require('../models/LessonFile');
const Enrollment = require('../models/Enrollment');
const ChapterProgress = require('../models/ChapterProgress');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const { initializeStudentCourseProgress } = require('./progress.service');

/**
 * Fetch and construct comprehensive chapter summary & documents dossier
 * including syllabus, lesson, presentation outline, quiz questions with answer keys,
 * and complete cohort assessment performance sorted by surname or score.
 */
async function getChapterSummaryData(chapterId, { sortBy = 'surname', sortOrder } = {}) {
  const chapter = await Chapter.findById(chapterId)
    .populate('courseId', 'courseCode courseTitle classification academicYearLevel term academicDesignation')
    .populate('moduleId', 'moduleNumber title description');

  if (!chapter) {
    throw new Error('Chapter not found');
  }

  const course = chapter.courseId;
  const moduleInfo = chapter.moduleId;

  // 1. Curriculum Lesson details & uploaded files (PDF/PPT)
  const lesson = await Lesson.findOne({ chapterId: chapter._id });
  const lessonFiles = await LessonFile.find({ chapterId: chapter._id }).select('-storagePath').sort({ createdAt: -1 });

  // 2. Interactive Presentation deck
  const presentation = await Presentation.findOne({ chapterId: chapter._id });

  // 3. Quiz with full question stems, options, and answer keys
  const quiz = await Quiz.findOne({ chapterId: chapter._id, publicationStatus: 'published' }).sort({ version: -1 });
  let questionsWithAnswers = [];

  if (quiz) {
    const questions = await Question.find({ quizId: quiz._id }).sort({ position: 1 });
    const questionIds = questions.map(q => q._id);
    const options = await QuestionOption.find({ questionId: { $in: questionIds } }).sort({ optionLabel: 1 });

    const optionsByQ = new Map();
    options.forEach(opt => {
      const qId = opt.questionId.toString();
      if (!optionsByQ.has(qId)) optionsByQ.set(qId, []);
      optionsByQ.get(qId).push(opt);
    });

    questionsWithAnswers = questions.map(q => {
      const qOpts = optionsByQ.get(q._id.toString()) || [];
      const correctOpt = qOpts.find(o => o.isCorrect);
      return {
        id: q._id,
        position: q.position,
        questionText: q.questionText,
        points: q.points || 1,
        correctOption: correctOpt ? correctOpt.optionLabel : null,
        correctAnswerText: correctOpt ? correctOpt.optionText : '',
        options: qOpts.map(o => ({
          id: o._id,
          label: o.optionLabel,
          text: o.optionText,
          isCorrect: Boolean(o.isCorrect)
        }))
      };
    });
  }

  // 4. Ensure all active students are enrolled in course
  const activeStudents = await User.find({ role: 'student', isActive: true });
  for (const st of activeStudents) {
    const existing = await Enrollment.findOne({ courseId: course._id, studentId: st._id });
    if (!existing) {
      await Enrollment.create({
        courseId: course._id,
        studentId: st._id,
        status: 'active',
        enrolledAt: st.createdAt || new Date()
      });
      await initializeStudentCourseProgress(st._id, course._id);
    }
  }

  const enrollments = await Enrollment.find({ courseId: course._id, status: 'active' })
    .populate('studentId', 'username firstName surname email')
    .sort({ 'studentId.surname': 1 });

  const studentIds = enrollments.map(e => e.studentId?._id).filter(Boolean);

  const progresses = await ChapterProgress.find({ chapterId: chapter._id, studentId: { $in: studentIds } });
  const progressMap = new Map();
  progresses.forEach(p => progressMap.set(p.studentId.toString(), p));

  const attempts = await QuizAttempt.find({
    chapterId: chapter._id,
    studentId: { $in: studentIds },
    status: { $in: ['completed', 'timed_out'] }
  }).sort({ submittedAt: -1 });

  const attemptsByStudent = new Map();
  attempts.forEach(att => {
    const sId = att.studentId.toString();
    if (!attemptsByStudent.has(sId)) attemptsByStudent.set(sId, []);
    attemptsByStudent.get(sId).push(att);
  });

  const rawRecords = [];
  let sumScores = 0;
  let highestScoreInCohort = null;
  let lowestScoreInCohort = null;
  let attemptedCount = 0;
  let passedCount = 0;

  enrollments.forEach(enr => {
    const s = enr.studentId;
    if (!s) return;
    const sId = s._id.toString();
    const prog = progressMap.get(sId);
    const stuAttempts = attemptsByStudent.get(sId) || [];

    const attemptsCount = stuAttempts.length || (prog?.attemptsCount ?? 0);
    let bestScore = null;
    let latestScore = null;
    let latestAttemptAt = null;

    if (stuAttempts.length > 0) {
      latestScore = stuAttempts[0].correctAnswers;
      latestAttemptAt = stuAttempts[0].submittedAt;
      const scores = stuAttempts.map(a => a.correctAnswers);
      bestScore = Math.max(...scores);
    } else if (prog && prog.highestScore !== undefined && prog.highestScore !== null) {
      bestScore = prog.highestScore;
      latestScore = prog.highestScore;
      latestAttemptAt = prog.latestAttemptAt || prog.updatedAt;
    }

    const isAttempted = attemptsCount > 0 && bestScore !== null;
    const isPassed = isAttempted && bestScore >= (quiz?.passingScore || 15);

    if (isAttempted) {
      attemptedCount++;
      sumScores += bestScore;
      if (highestScoreInCohort === null || bestScore > highestScoreInCohort) highestScoreInCohort = bestScore;
      if (lowestScoreInCohort === null || bestScore < lowestScoreInCohort) lowestScoreInCohort = bestScore;
      if (isPassed) passedCount++;
    }

    let status = 'not_attempted';
    if (isPassed) status = 'passed';
    else if (isAttempted) status = 'failed';
    else if (prog && prog.status) status = prog.status;

    rawRecords.push({
      studentId: s._id,
      username: s.username,
      firstName: s.firstName,
      surname: s.surname,
      fullName: `${s.surname}, ${s.firstName}`,
      email: s.email,
      attemptsCount,
      highestScore: bestScore,
      highestScorePercentage: bestScore !== null ? Math.round((bestScore / (quiz?.questionCount || 20)) * 100) : null,
      latestScore,
      status,
      isPassed,
      latestAttemptAt
    });
  });

  const totalEnrolled = rawRecords.length;
  const passRate = attemptedCount > 0 ? Math.round((passedCount / attemptedCount) * 100 * 10) / 10 : 0;
  const averageScore = attemptedCount > 0 ? Math.round((sumScores / attemptedCount) * 10) / 10 : null;
  const averagePercentage = averageScore !== null ? Math.round((averageScore / (quiz?.questionCount || 20)) * 100 * 10) / 10 : null;

  const cohort = {
    totalEnrolled,
    attemptedCount,
    passedCount,
    failedCount: attemptedCount - passedCount,
    notAttemptedCount: totalEnrolled - attemptedCount,
    passRate,
    averageScore,
    averagePercentage,
    highestScore: highestScoreInCohort,
    lowestScore: lowestScoreInCohort
  };

  // 5. Apply sorting
  const effectiveSortBy = sortBy === 'score' ? 'score' : 'surname';
  const effectiveSortOrder = sortOrder || (effectiveSortBy === 'score' ? 'desc' : 'asc');

  rawRecords.sort((a, b) => {
    if (effectiveSortBy === 'score') {
      const scoreA = a.highestScore !== null ? a.highestScore : -1;
      const scoreB = b.highestScore !== null ? b.highestScore : -1;
      if (scoreA !== scoreB) {
        return effectiveSortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }
      return a.surname.localeCompare(b.surname);
    } else {
      const cmp = a.surname.localeCompare(b.surname);
      if (cmp !== 0) {
        return effectiveSortOrder === 'desc' ? -cmp : cmp;
      }
      return a.firstName.localeCompare(b.firstName);
    }
  });

  const sortedRecords = rawRecords.map((rec, idx) => ({
    rank: idx + 1,
    ...rec
  }));

  return {
    chapter: {
      id: chapter._id,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      description: chapter.description,
      isPublished: chapter.isPublished
    },
    course: {
      id: course._id,
      courseCode: course.courseCode,
      courseTitle: course.courseTitle,
      classification: course.classification,
      academicYearLevel: course.academicYearLevel,
      term: course.term,
      academicDesignation: course.academicDesignation
    },
    module: {
      id: moduleInfo?._id,
      moduleNumber: moduleInfo?.moduleNumber,
      title: moduleInfo?.title,
      description: moduleInfo?.description
    },
    lesson: lesson ? {
      id: lesson._id,
      overview: lesson.overview,
      learningObjectives: lesson.learningObjectives || [],
      keyConcepts: lesson.keyConcepts || [],
      studyGuide: lesson.studyGuide || [],
      citations: lesson.citations || [],
      videos: lesson.videos || [],
      content: lesson.content
    } : null,
    lessonFiles: (lessonFiles || []).map(f => ({
      id: f._id,
      originalFilename: f.originalFilename,
      fileSize: f.fileSize,
      mimeType: f.mimeType,
      createdAt: f.createdAt
    })),
    presentation: presentation ? {
      id: presentation._id,
      title: presentation.title,
      theme: presentation.theme,
      slideCount: presentation.slides?.length || 0,
      slides: (presentation.slides || []).map((sl, i) => ({
        slideNumber: i + 1,
        title: sl.title,
        bulletPoints: sl.bulletPoints || [],
        slideType: sl.slideType,
        hasCode: Boolean(sl.codeSnippet)
      }))
    } : null,
    quiz: quiz ? {
      id: quiz._id,
      title: quiz.title,
      version: quiz.version,
      questionCount: quiz.questionCount || 20,
      passingScore: quiz.passingScore || 15,
      timeLimitSeconds: quiz.timeLimitSeconds || 600,
      questions: questionsWithAnswers
    } : null,
    cohort,
    records: sortedRecords,
    sorting: {
      sortBy: effectiveSortBy,
      sortOrder: effectiveSortOrder
    }
  };
}

module.exports = {
  getChapterSummaryData
};

