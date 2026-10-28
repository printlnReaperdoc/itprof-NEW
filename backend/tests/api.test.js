require('dotenv').config();
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const {
  User,
  Course,
  Module,
  Chapter,
  Lesson,
  Presentation,
  Quiz,
  Question,
  QuestionOption,
  QuizAttempt,
  AttemptAnswer,
  ChapterProgress,
  AuditLog
} = require('../models');

const { canAccessChapter, handleQuizAttemptResult } = require('../services/progress.service');
const { gradeAttempt } = require('../services/grading.service');

describe('IT Professional Electives LMS Test Suite', () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    // Clean up test student if created
    await User.deleteMany({ username: /^test_student_/ });
    await ChapterProgress.deleteMany({ studentId: { $in: await User.find({ username: /^test_student_/ }).distinct('_id') } });
    await mongoose.connection.close(false);
  });

  test('1. Curriculum Integrity: Exactly 2 Courses, 8 Modules, 24 Chapters', async () => {
    const courses = await Course.find();
    assert.strictEqual(courses.length, 2, 'Should have exactly 2 courses');

    const courseCodes = courses.map(c => c.courseCode).sort();
    assert.deepStrictEqual(courseCodes, ['ITEP411-T', 'ITEP413-T']);

    const modules = await Module.find();
    assert.strictEqual(modules.length, 8, 'Should have exactly 8 modules (4 per course)');

    const chapters = await Chapter.find();
    assert.strictEqual(chapters.length, 24, 'Should have exactly 24 chapters (12 per course)');
  });

  test('2. Content Integrity: All 24 Chapters Have Preloaded Lessons and Presentations', async () => {
    const lessons = await Lesson.find({ publicationStatus: 'published' });
    assert.strictEqual(lessons.length, 24, 'All 24 chapters must have published lessons');

    const presentations = await Presentation.find({ publicationStatus: 'published' });
    assert.strictEqual(presentations.length, 24, 'All 24 chapters must have published presentations');

    for (const p of presentations) {
      assert.ok(p.slides.length >= 3, `Presentation ${p.title} must have at least 3 slides`);
    }
  });

  test('3. Assessment Integrity: All 24 Quizzes Have Exactly 20 Questions with 4 Options', async () => {
    const quizzes = await Quiz.find({ publicationStatus: 'published' });
    assert.strictEqual(quizzes.length, 24, 'All 24 chapters must have published quizzes');

    for (const q of quizzes) {
      const questions = await Question.find({ quizId: q._id });
      assert.strictEqual(questions.length, 20, `Quiz ${q.title} must have exactly 20 questions`);

      for (const question of questions) {
        const options = await QuestionOption.find({ questionId: question._id });
        assert.strictEqual(options.length, 4, `Question ${question._id} must have 4 options`);
        const correctCount = options.filter(o => o.isCorrect).length;
        assert.strictEqual(correctCount, 1, `Question ${question._id} must have exactly 1 correct option`);
      }
    }
  });

  test('4. Sequential Progression: Chapter 1 is Available, Chapter 2 is Locked Initially', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });
    const dmCh2 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 2 });

    const dummyStudent = {
      _id: new mongoose.Types.ObjectId(),
      role: 'student'
    };

    const accessCh1 = await canAccessChapter(dummyStudent, dmCh1._id);
    assert.strictEqual(accessCh1.allowed, true, 'Chapter 1 should be accessible by default');

    const accessCh2 = await canAccessChapter(dummyStudent, dmCh2._id);
    assert.strictEqual(accessCh2.allowed, false, 'Chapter 2 must be locked prior to passing Chapter 1');
  });

  test('5. Passing Chapter 1 Unlocks Chapter 2 in the SAME Course Only', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const ccCourse = await Course.findOne({ courseCode: 'ITEP413-T' });

    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });
    const dmCh2 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 2 });
    const ccCh2 = await Chapter.findOne({ courseId: ccCourse._id, chapterNumber: 2 });

    const testStudentId = new mongoose.Types.ObjectId();

    // Passing score on DM Chapter 1: 16 out of 20 (80%)
    const result = await handleQuizAttemptResult({
      studentId: testStudentId,
      courseId: dmCourse._id,
      chapterId: dmCh1._id,
      score: 16,
      scorePercentage: 80,
      isPassed: true
    });

    assert.strictEqual(result.progress.status, 'passed');
    assert.ok(result.nextChapterUnlocked, 'Next chapter should be unlocked');
    assert.strictEqual(result.nextChapterUnlocked._id.toString(), dmCh2._id.toString());

    // Check student can now access DM Chapter 2
    const accessDMCh2 = await canAccessChapter({ _id: testStudentId, role: 'student' }, dmCh2._id);
    assert.strictEqual(accessDMCh2.allowed, true, 'DM Chapter 2 should now be accessible');

    // Verify Cloud Computing Chapter 2 is STILL LOCKED (course isolation!)
    const accessCCCh2 = await canAccessChapter({ _id: testStudentId, role: 'student' }, ccCh2._id);
    assert.strictEqual(accessCCCh2.allowed, false, 'Passing DM Ch 1 must NEVER unlock Cloud Computing Ch 2');
  });

  test('6. Failing a Quiz Does NOT Unlock the Next Chapter', async () => {
    const ccCourse = await Course.findOne({ courseCode: 'ITEP413-T' });
    const ccCh1 = await Chapter.findOne({ courseId: ccCourse._id, chapterNumber: 1 });
    const ccCh2 = await Chapter.findOne({ courseId: ccCourse._id, chapterNumber: 2 });

    const failStudentId = new mongoose.Types.ObjectId();

    // Failing score on CC Chapter 1: 14 out of 20 (70% < 75%)
    const result = await handleQuizAttemptResult({
      studentId: failStudentId,
      courseId: ccCourse._id,
      chapterId: ccCh1._id,
      score: 14,
      scorePercentage: 70,
      isPassed: false
    });

    assert.strictEqual(result.progress.status, 'failed');
    assert.strictEqual(result.nextChapterUnlocked, null);

    // CC Chapter 2 remains locked
    const accessCCCh2 = await canAccessChapter({ _id: failStudentId, role: 'student' }, ccCh2._id);
    assert.strictEqual(accessCCCh2.allowed, false, 'Failed attempt must not unlock subsequent chapter');
  });

  test('7. Audit Logging: Actions Are Persisted with Sanitized Secrets', async () => {
    const recentLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(10);
    assert.ok(recentLogs.length > 0, 'Audit logs should be created for system events');

    for (const log of recentLogs) {
      if (log.details) {
        assert.strictEqual(log.details.password, undefined);
        assert.strictEqual(log.details.passwordHash, undefined);
      }
    }
  });
});

