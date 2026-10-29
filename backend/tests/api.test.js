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
const { startAttempt } = require('../controllers/quizAttempt.controller');
const { getChapterSummaryData } = require('../services/chapterSummary.service');
const {
  generateQuizAnswerKeysPDF,
  generateChapterSummaryPDF,
  generateChapterSummaryXLSX,
  generateChapterSummaryCSV
} = require('../services/export.service');

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

  test('8. Answer Keys PDF Generation: Produces Valid PDF Buffer with 24 Chapters', async () => {
    const courses = await Course.find().sort({ courseCode: 1 });
    const chapters = await Chapter.find({ isPublished: true }).sort({ chapterNumber: 1 });
    const quizzes = await Quiz.find({ publicationStatus: 'published' }).sort({ version: -1 });

    const coursesData = courses.map(c => {
      const cChaps = chapters.filter(ch => ch.courseId.toString() === c._id.toString());
      return {
        id: c._id,
        courseCode: c.courseCode,
        courseTitle: c.courseTitle,
        academicYearLevel: c.academicYearLevel,
        term: c.term,
        chapters: cChaps.map(ch => {
          const q = quizzes.find(qz => qz.chapterId.toString() === ch._id.toString());
          return {
            id: ch._id,
            chapterNumber: ch.chapterNumber,
            title: ch.title,
            quiz: q ? {
              id: q._id,
              title: q.title,
              passingScore: 15,
              questionCount: 20,
              questions: [
                {
                  id: new mongoose.Types.ObjectId(),
                  position: 1,
                  questionText: 'Sample Test Question 1?',
                  points: 1,
                  correctOption: 'B',
                  options: [
                    { label: 'A', optionText: 'Option A', isCorrect: false },
                    { label: 'B', optionText: 'Option B', isCorrect: true },
                    { label: 'C', optionText: 'Option C', isCorrect: false },
                    { label: 'D', optionText: 'Option D', isCorrect: false }
                  ]
                }
              ]
            } : null
          };
        })
      };
    });

    const pdfBuffer = await generateQuizAnswerKeysPDF({
      coursesData,
      requestedBy: { firstName: 'Test', surname: 'User', username: 'student1', role: 'student' }
    });

    assert.ok(Buffer.isBuffer(pdfBuffer), 'Output must be a Buffer');
    assert.ok(pdfBuffer.length > 500, 'PDF buffer must contain binary content');
    // Verify PDF header magic bytes "%PDF-"
    const magic = pdfBuffer.slice(0, 5).toString('ascii');
    assert.strictEqual(magic, '%PDF-', 'Buffer must begin with %PDF- header signature');
  });

  test('9. Role Permission: Faculty Members Are Blocked from Taking Quizzes', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });

    const facultyUser = {
      _id: new mongoose.Types.ObjectId(),
      role: 'faculty',
      username: 'faculty_test'
    };

    let statusCode = null;
    let jsonResponse = null;

    const mockReq = {
      user: facultyUser,
      params: { chapterId: dmCh1._id.toString() }
    };

    const mockRes = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(payload) {
        jsonResponse = payload;
        return this;
      }
    };

    await startAttempt(mockReq, mockRes, () => {});

    assert.strictEqual(statusCode, 403, 'Faculty startAttempt must return HTTP 403');
    assert.strictEqual(jsonResponse.code, 'FACULTY_CANNOT_TAKE_QUIZ', 'Response code must be FACULTY_CANNOT_TAKE_QUIZ');
    assert.strictEqual(jsonResponse.success, false);
  });

  test('10. Chapter Summary & Documents Dossier: Aggregates Full Syllabus, Slides, 20 Questions with Keys, and Cohort Metrics', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });

    const summary = await getChapterSummaryData(dmCh1._id, { sortBy: 'surname', sortOrder: 'asc' });

    assert.ok(summary.chapter, 'Must have chapter metadata');
    assert.strictEqual(summary.chapter.chapterNumber, 1);
    assert.ok(summary.lesson, 'Must have lesson content');
    assert.ok(summary.lesson.learningObjectives.length > 0, 'Lesson must contain learning objectives');
    assert.ok(summary.presentation, 'Must have interactive presentation deck');
    assert.ok(summary.presentation.slides.length >= 3, 'Presentation must contain slides');
    assert.ok(summary.quiz, 'Must have quiz assessment');
    assert.strictEqual(summary.quiz.questions.length, 20, 'Quiz must have exactly 20 questions');

    // Verify all 20 questions have correct answer keys
    for (const q of summary.quiz.questions) {
      assert.ok(q.correctOption, `Question ${q.position} must have correctOption letter`);
      assert.ok(['A', 'B', 'C', 'D'].includes(q.correctOption));
    }

    // Verify cohort metrics
    assert.ok(summary.cohort, 'Must have cohort statistics');
    assert.ok(summary.cohort.totalEnrolled >= 8, 'Must reflect enrolled students');
    assert.ok(Array.isArray(summary.records), 'Records must be an array');
  });

  test('11. Sorting Implementation: Both Surname and Quiz Score Sorting Work Accurately', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });

    // 1. Sort by Surname Ascending
    const summarySurnameAsc = await getChapterSummaryData(dmCh1._id, { sortBy: 'surname', sortOrder: 'asc' });
    const surnamesAsc = summarySurnameAsc.records.map(r => r.surname);
    const sortedCopySurname = [...surnamesAsc].sort((a, b) => a.localeCompare(b));
    assert.deepStrictEqual(surnamesAsc, sortedCopySurname, 'Records must be sorted by surname ascending');

    // 2. Sort by Score Descending
    const summaryScoreDesc = await getChapterSummaryData(dmCh1._id, { sortBy: 'score', sortOrder: 'desc' });
    for (let i = 0; i < summaryScoreDesc.records.length - 1; i++) {
      const currentScore = summaryScoreDesc.records[i].highestScore ?? -1;
      const nextScore = summaryScoreDesc.records[i + 1].highestScore ?? -1;
      assert.ok(currentScore >= nextScore, `Score at rank ${i + 1} (${currentScore}) must be >= rank ${i + 2} (${nextScore})`);
    }

    // 3. Sort by Score Ascending
    const summaryScoreAsc = await getChapterSummaryData(dmCh1._id, { sortBy: 'score', sortOrder: 'asc' });
    for (let i = 0; i < summaryScoreAsc.records.length - 1; i++) {
      const currentScore = summaryScoreAsc.records[i].highestScore ?? -1;
      const nextScore = summaryScoreAsc.records[i + 1].highestScore ?? -1;
      assert.ok(currentScore <= nextScore, `Score at rank ${i + 1} (${currentScore}) must be <= rank ${i + 2} (${nextScore})`);
    }
  });

  test('12. Chapter Summary Dossier Exports: PDF, XLSX, and CSV Are Valid and Non-Empty', async () => {
    const dmCourse = await Course.findOne({ courseCode: 'ITEP411-T' });
    const dmCh1 = await Chapter.findOne({ courseId: dmCourse._id, chapterNumber: 1 });

    const summaryData = await getChapterSummaryData(dmCh1._id, { sortBy: 'score', sortOrder: 'desc' });
    const facultyUser = { firstName: 'Admin', surname: 'Faculty', username: 'faculty1', role: 'faculty' };

    // 1. PDF Dossier
    const pdfBuffer = await generateChapterSummaryPDF({ summaryData, requestedBy: facultyUser });
    assert.ok(Buffer.isBuffer(pdfBuffer), 'PDF output must be a buffer');
    assert.ok(pdfBuffer.length > 1000, 'PDF buffer must contain substantial content');
    assert.strictEqual(pdfBuffer.slice(0, 5).toString('ascii'), '%PDF-', 'PDF magic bytes header');

    // 2. Excel XLSX Dossier
    const xlsxBuffer = await generateChapterSummaryXLSX({ summaryData });
    assert.ok(Buffer.isBuffer(xlsxBuffer), 'XLSX output must be a buffer');
    assert.ok(xlsxBuffer.length > 1000, 'XLSX buffer must contain substantial content');
    // Zip signature PK\x03\x04
    assert.strictEqual(xlsxBuffer.slice(0, 4).toString('hex'), '504b0304', 'XLSX must have zip file header');

    // 3. CSV Dossier
    const csvBuffer = await generateChapterSummaryCSV({ summaryData });
    assert.ok(Buffer.isBuffer(csvBuffer), 'CSV output must be a buffer');
    const csvText = csvBuffer.toString('utf-8');
    assert.ok(csvText.includes('Rank,StudentID,Surname,FirstName'), 'CSV must contain standard headers');
    assert.ok(csvText.includes('ITEP411-T'), 'CSV must include course code metadata');
  });
});

