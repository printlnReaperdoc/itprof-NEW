const User = require('./User');
const Course = require('./Course');
const Module = require('./Module');
const Chapter = require('./Chapter');
const Enrollment = require('./Enrollment');
const Lesson = require('./Lesson');
const Presentation = require('./Presentation');
const LessonFile = require('./LessonFile');
const Quiz = require('./Quiz');
const Question = require('./Question');
const QuestionOption = require('./QuestionOption');
const QuizAttempt = require('./QuizAttempt');
const AttemptAnswer = require('./AttemptAnswer');
const ChapterProgress = require('./ChapterProgress');
const AuditLog = require('./AuditLog');
const SystemSetting = require('./SystemSetting');

module.exports = {
  User,
  Course,
  Module,
  Chapter,
  Enrollment,
  Lesson,
  Presentation,
  LessonFile,
  Quiz,
  Question,
  QuestionOption,
  QuizAttempt,
  AttemptAnswer,
  ChapterProgress,
  AuditLog,
  SystemSetting
};

