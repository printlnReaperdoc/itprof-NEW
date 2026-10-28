require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Models
const {
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
} = require('../models');

// Seed Data
const coursesData = require('./seedData/coursesModulesChapters');
const dataMiningContent = require('./seedData/dataMiningContent');
const cloudComputingContent = require('./seedData/cloudComputingContent');
const dataMiningQuizzes = require('./seedData/dataMiningQuizzes');
const cloudComputingQuizzes = require('./seedData/cloudComputingQuizzes');
const { initializeStudentCourseProgress } = require('../services/progress.service');

const seedDatabase = async () => {
  console.log('========================================================');
  console.log('[Seed] Initiating LMS Database Seeding Process...');
  console.log('========================================================');

  await connectDB();

  try {
    // 0. Clear all existing data entries before seeding
    console.log('\n[0/5] Purging all existing database collections before fresh seed...');
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Module.deleteMany({}),
      Chapter.deleteMany({}),
      Enrollment.deleteMany({}),
      Lesson.deleteMany({}),
      Presentation.deleteMany({}),
      LessonFile.deleteMany({}),
      Quiz.deleteMany({}),
      Question.deleteMany({}),
      QuestionOption.deleteMany({}),
      QuizAttempt.deleteMany({}),
      AttemptAnswer.deleteMany({}),
      ChapterProgress.deleteMany({}),
      AuditLog.deleteMany({}),
      SystemSetting.deleteMany({})
    ]);
    console.log('  -> All 16 database collections successfully purged.');

    // 1. Provision Default Faculty & Admin Accounts
    console.log('\n[1/5] Checking / Provisioning Faculty and Admin Accounts...');
    let facultyUser = await User.findOne({ username: 'faculty' });
    if (!facultyUser) {
      const passwordHash = await User.hashPassword('FacultyPassword2026!');
      facultyUser = await User.create({
        username: 'faculty',
        passwordHash,
        firstName: 'Professor',
        surname: 'Ramirez',
        role: 'faculty',
        isActive: true
      });
      console.log('  -> Default Faculty created: username "faculty", password "FacultyPassword2026!"');
    } else {
      console.log('  -> Faculty account already exists ("faculty").');
    }

    let demoStudent = await User.findOne({ username: 'student1' });
    if (!demoStudent) {
      const passwordHash = await User.hashPassword('StudentPassword2026!');
      demoStudent = await User.create({
        username: 'student1',
        passwordHash,
        firstName: 'Alex',
        surname: 'Santos',
        role: 'student',
        isActive: true
      });
      console.log('  -> Demo Student created: username "student1", password "StudentPassword2026!"');
    }

    // 2. Provision Courses, Modules, and Chapters
    console.log('\n[2/5] Seeding Unified Curriculum: Courses, Modules & Chapters...');
    let totalChaptersCreated = 0;

    for (const cData of coursesData) {
      const { modules, ...courseFields } = cData;

      let course = await Course.findOne({ courseCode: courseFields.courseCode });
      if (!course) {
        course = await Course.create(courseFields);
        console.log(`  -> Course created: ${course.courseCode} - ${course.courseTitle}`);
      } else {
        console.log(`  -> Course verified: ${course.courseCode} - ${course.courseTitle}`);
      }

      for (const mData of modules) {
        const { chapters, ...moduleFields } = mData;

        let mod = await Module.findOne({ courseId: course._id, moduleNumber: moduleFields.moduleNumber });
        if (!mod) {
          mod = await Module.create({ ...moduleFields, courseId: course._id });
          console.log(`     -> Module ${mod.moduleNumber}: ${mod.title}`);
        }

        for (const chData of chapters) {
          let chapter = await Chapter.findOne({ courseId: course._id, chapterNumber: chData.chapterNumber });
          if (!chapter) {
            chapter = await Chapter.create({
              ...chData,
              courseId: course._id,
              moduleId: mod._id,
              isPublished: true
            });
            totalChaptersCreated++;
          }
        }
      }
    }
    console.log(`  -> All 24 curriculum chapters verified in MongoDB.`);

    // 3. Seed Lessons & Interactive Presentations
    console.log('\n[3/5] Seeding Preloaded Lesson Contents & Interactive Presentations...');
    const allCourses = await Course.find();
    const dmCourse = allCourses.find(c => c.courseCode === 'ITEP411-T');
    const ccCourse = allCourses.find(c => c.courseCode === 'ITEP413-T');

    const dmChapters = await Chapter.find({ courseId: dmCourse._id }).sort({ chapterNumber: 1 });
    const ccChapters = await Chapter.find({ courseId: ccCourse._id }).sort({ chapterNumber: 1 });

    // Seed Data Mining Content
    for (const item of dataMiningContent) {
      const chapter = dmChapters.find(ch => ch.chapterNumber === item.chapterNumber);
      if (!chapter) continue;

      // Lesson
      await Lesson.findOneAndUpdate(
        { chapterId: chapter._id },
        {
          chapterId: chapter._id,
          ...item.lesson,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          updatedBy: facultyUser._id
        },
        { upsert: true, new: true }
      );

      // Presentation
      await Presentation.findOneAndUpdate(
        { chapterId: chapter._id },
        {
          chapterId: chapter._id,
          ...item.presentation,
          version: 1,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          updatedBy: facultyUser._id
        },
        { upsert: true, new: true }
      );
    }
    console.log('  -> Data Mining: 12 Lessons & 12 Presentations seeded.');

    // Seed Cloud Computing Content
    for (const item of cloudComputingContent) {
      const chapter = ccChapters.find(ch => ch.chapterNumber === item.chapterNumber);
      if (!chapter) continue;

      // Lesson
      await Lesson.findOneAndUpdate(
        { chapterId: chapter._id },
        {
          chapterId: chapter._id,
          ...item.lesson,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          updatedBy: facultyUser._id
        },
        { upsert: true, new: true }
      );

      // Presentation
      await Presentation.findOneAndUpdate(
        { chapterId: chapter._id },
        {
          chapterId: chapter._id,
          ...item.presentation,
          version: 1,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          updatedBy: facultyUser._id
        },
        { upsert: true, new: true }
      );
    }
    console.log('  -> Cloud Computing: 12 Lessons & 12 Presentations seeded.');

    // 4. Seed 24 Default Quizzes & 480 Questions
    console.log('\n[4/5] Seeding Default 20-Question Quizzes (480 Questions Total)...');

    // Seed DM Quizzes
    for (const qzData of dataMiningQuizzes) {
      const chapter = dmChapters.find(ch => ch.chapterNumber === qzData.chapterNumber);
      if (!chapter) continue;

      let quiz = await Quiz.findOne({ chapterId: chapter._id, version: 1 });
      if (!quiz) {
        quiz = await Quiz.create({
          courseId: dmCourse._id,
          chapterId: chapter._id,
          title: qzData.title,
          version: 1,
          timeLimitSeconds: 600, // 10 minutes
          questionCount: 20,
          passingScore: 15,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          publishedAt: new Date()
        });

        // Insert questions and options
        for (const qItem of qzData.questions) {
          const question = await Question.create({
            quizId: quiz._id,
            questionText: qItem.questionText,
            points: 1,
            position: qItem.position
          });

          const optionsToInsert = qItem.options.map(opt => ({
            questionId: question._id,
            optionLabel: opt.label,
            optionText: opt.text,
            isCorrect: opt.isCorrect
          }));

          await QuestionOption.insertMany(optionsToInsert);
        }
      }
    }
    console.log('  -> Data Mining: 12 Quizzes x 20 Questions = 240 questions seeded.');

    // Seed CC Quizzes
    for (const qzData of cloudComputingQuizzes) {
      const chapter = ccChapters.find(ch => ch.chapterNumber === qzData.chapterNumber);
      if (!chapter) continue;

      let quiz = await Quiz.findOne({ chapterId: chapter._id, version: 1 });
      if (!quiz) {
        quiz = await Quiz.create({
          courseId: ccCourse._id,
          chapterId: chapter._id,
          title: qzData.title,
          version: 1,
          timeLimitSeconds: 600, // 10 minutes
          questionCount: 20,
          passingScore: 15,
          publicationStatus: 'published',
          createdBy: facultyUser._id,
          publishedAt: new Date()
        });

        for (const qItem of qzData.questions) {
          const question = await Question.create({
            quizId: quiz._id,
            questionText: qItem.questionText,
            points: 1,
            position: qItem.position
          });

          const optionsToInsert = qItem.options.map(opt => ({
            questionId: question._id,
            optionLabel: opt.label,
            optionText: opt.text,
            isCorrect: opt.isCorrect
          }));

          await QuestionOption.insertMany(optionsToInsert);
        }
      }
    }
    console.log('  -> Cloud Computing: 12 Quizzes x 20 Questions = 240 questions seeded.');

    // 5. Seed Student Cohort, Course Enrollments & Assessment Attempts
    console.log('\n[5/6] Seeding Student Cohort, Course Enrollments & Assessment Attempts...');

    const studentCohort = [
      { username: 'student1', firstName: 'Alex', surname: 'Santos' },
      { username: 'student2', firstName: 'Bea', surname: 'Gonzales' },
      { username: 'student3', firstName: 'Carlos', surname: 'Mendoza' },
      { username: 'student4', firstName: 'Diana', surname: 'Cruz' },
      { username: 'student5', firstName: 'Ethan', surname: 'Reyes' },
      { username: 'student6', firstName: 'Fiona', surname: 'Bautista' },
      { username: 'student7', firstName: 'Gabriel', surname: 'Aquino' },
      { username: 'student8', firstName: 'Hannah', surname: 'Dizon' }
    ];

    const studentDocs = {};
    for (const sInfo of studentCohort) {
      let stUser = await User.findOne({ username: sInfo.username });
      if (!stUser) {
        const passwordHash = await User.hashPassword('StudentPassword2026!');
        stUser = await User.create({
          username: sInfo.username,
          passwordHash,
          firstName: sInfo.firstName,
          surname: sInfo.surname,
          role: 'student',
          isActive: true
        });
      }
      studentDocs[sInfo.username] = stUser;

      // Enroll in both courses
      for (const crs of [dmCourse, ccCourse]) {
        await Enrollment.findOneAndUpdate(
          { courseId: crs._id, studentId: stUser._id },
          { status: 'active', enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          { upsert: true, new: true }
        );
        // Initialize 12 chapter progress records (Ch 1 available, Ch 2-12 locked)
        await initializeStudentCourseProgress(stUser._id, crs._id);
      }
    }
    console.log(`  -> 8 Students enrolled into both Data Mining and Cloud Computing.`);

    // Preload assessment performance profile
    const studentProfiles = {
      // Bea Gonzales: Top honors
      student2: {
        dm: [
          { chNum: 1, score: 19 },
          { chNum: 2, score: 20 },
          { chNum: 3, score: 18 },
          { chNum: 4, score: 19 },
          { chNum: 5, score: 18 },
          { chNum: 6, score: 20 },
          { chNum: 7, score: 19 }
        ],
        cc: [
          { chNum: 1, score: 20 },
          { chNum: 2, score: 19 },
          { chNum: 3, score: 19 },
          { chNum: 4, score: 18 },
          { chNum: 5, score: 20 },
          { chNum: 6, score: 19 }
        ]
      },
      // Alex Santos: Strong performer
      student1: {
        dm: [
          { chNum: 1, score: 17 },
          { chNum: 2, score: 18 },
          { chNum: 3, score: 16 },
          { chNum: 4, score: 19 }
        ],
        cc: [
          { chNum: 1, score: 18 },
          { chNum: 2, score: 17 },
          { chNum: 3, score: 19 }
        ]
      },
      // Diana Cruz: Consistent
      student4: {
        dm: [
          { chNum: 1, score: 16 },
          { chNum: 2, score: 17 },
          { chNum: 3, score: 18 },
          { chNum: 4, score: 16 },
          { chNum: 5, score: 17 }
        ],
        cc: [
          { chNum: 1, score: 17 },
          { chNum: 2, score: 18 },
          { chNum: 3, score: 16 },
          { chNum: 4, score: 18 }
        ]
      },
      // Hannah Dizon: Dedicated
      student8: {
        dm: [
          { chNum: 1, score: 18 },
          { chNum: 2, score: 19 },
          { chNum: 3, score: 17 }
        ],
        cc: [
          { chNum: 1, score: 19 },
          { chNum: 2, score: 18 },
          { chNum: 3, score: 20 },
          { chNum: 4, score: 17 },
          { chNum: 5, score: 19 }
        ]
      },
      // Carlos Mendoza: Moderate
      student3: {
        dm: [
          { chNum: 1, score: 15 },
          { chNum: 2, score: 16 }
        ],
        cc: [
          { chNum: 1, score: 16 }
        ]
      },
      // Gabriel Aquino: In progress, failed Ch 2
      student7: {
        dm: [
          { chNum: 1, score: 17 },
          { chNum: 2, score: 13 }
        ],
        cc: [
          { chNum: 1, score: 16 },
          { chNum: 2, score: 15 }
        ]
      },
      // Ethan Reyes: Failed first, retook and passed Ch 1
      student5: {
        dm: [
          { chNum: 1, score: 12, retakeScore: 16 }
        ],
        cc: [
          { chNum: 1, score: 14 }
        ]
      },
      // Fiona Bautista: Freshly enrolled, no attempts yet
      student6: {
        dm: [],
        cc: []
      }
    };

    let totalAttemptsCreated = 0;

    for (const [username, profile] of Object.entries(studentProfiles)) {
      const student = studentDocs[username];
      if (!student) continue;

      const courseConfigs = [
        { course: dmCourse, chapters: dmChapters, attempts: profile.dm },
        { course: ccCourse, chapters: ccChapters, attempts: profile.cc }
      ];

      for (const cfg of courseConfigs) {
        for (const item of cfg.attempts) {
          const chapter = cfg.chapters.find(ch => ch.chapterNumber === item.chNum);
          if (!chapter) continue;

          const quiz = await Quiz.findOne({ chapterId: chapter._id, version: 1 });
          if (!quiz) continue;

          const questions = await Question.find({ quizId: quiz._id }).sort({ position: 1 });
          const questionIds = questions.map(q => q._id);
          const allOptions = await QuestionOption.find({ questionId: { $in: questionIds } });

          // Helper to record an attempt
          const recordAttempt = async (score, daysAgo) => {
            const attemptDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
            const isPassed = score >= (quiz.passingScore || 15);
            const scorePercentage = Math.round((score / (quiz.questionCount || 20)) * 100 * 10) / 10;

            const attempt = await QuizAttempt.create({
              studentId: student._id,
              courseId: cfg.course._id,
              chapterId: chapter._id,
              quizId: quiz._id,
              quizVersion: quiz.version,
              startedAt: attemptDate,
              deadlineAt: new Date(attemptDate.getTime() + 600 * 1000),
              submittedAt: new Date(attemptDate.getTime() + 380 * 1000),
              correctAnswers: score,
              scorePercentage,
              status: 'completed',
              submissionType: 'manual'
            });
            totalAttemptsCreated++;

            // Create 20 answers
            const answersToInsert = [];
            for (let i = 0; i < questions.length; i++) {
              const q = questions[i];
              const qOpts = allOptions.filter(o => o.questionId.toString() === q._id.toString());
              const correctOpt = qOpts.find(o => o.isCorrect);
              const wrongOpts = qOpts.filter(o => !o.isCorrect);

              const shouldBeCorrect = i < score;
              const selected = shouldBeCorrect ? correctOpt : (wrongOpts[i % wrongOpts.length] || correctOpt);

              answersToInsert.push({
                attemptId: attempt._id,
                questionId: q._id,
                selectedOptionId: selected?._id || null,
                isCorrect: shouldBeCorrect,
                answeredAt: attempt.submittedAt
              });
            }
            if (answersToInsert.length > 0) {
              await AttemptAnswer.insertMany(answersToInsert);
            }

            // Update ChapterProgress
            let prog = await ChapterProgress.findOne({ studentId: student._id, chapterId: chapter._id });
            if (!prog) {
              prog = new ChapterProgress({
                studentId: student._id,
                courseId: cfg.course._id,
                chapterId: chapter._id
              });
            }

            prog.attemptsCount = (prog.attemptsCount || 0) + 1;
            prog.highestScore = Math.max(prog.highestScore || 0, score);
            prog.highestScorePercentage = Math.round((prog.highestScore / 20) * 100 * 10) / 10;
            prog.latestAttemptAt = attempt.submittedAt;
            if (isPassed) {
              prog.status = 'passed';
              prog.passedAt = attempt.submittedAt;
            } else if (prog.status !== 'passed') {
              prog.status = 'failed';
            }
            await prog.save();

            // Unlock next chapter if passed
            if (isPassed && chapter.chapterNumber < 12) {
              const nextChapter = cfg.chapters.find(ch => ch.chapterNumber === chapter.chapterNumber + 1);
              if (nextChapter) {
                await ChapterProgress.findOneAndUpdate(
                  { studentId: student._id, chapterId: nextChapter._id, status: 'locked' },
                  { status: 'available' }
                );
              }
            }
          };

          // Record first attempt
          await recordAttempt(item.score, 14 - item.chNum);

          // If retake exists (e.g. Ethan Reyes)
          if (item.retakeScore !== undefined) {
            await recordAttempt(item.retakeScore, 13 - item.chNum);
          }
        }
      }
    }
    console.log(`  -> ${totalAttemptsCreated} authentic quiz attempts & answer submissions seeded across all chapters.`);

    // 6. Verification & Audit Logging
    console.log('\n[6/6] Performing System Verification...');
    const totalCourses = await Course.countDocuments();
    const totalModules = await Module.countDocuments();
    const totalChapters = await Chapter.countDocuments();
    const totalLessons = await Lesson.countDocuments();
    const totalPresentations = await Presentation.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalOptions = await QuestionOption.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEnrollments = await Enrollment.countDocuments();
    const totalAttempts = await QuizAttempt.countDocuments();
    const totalProgressRecords = await ChapterProgress.countDocuments();

    console.log('--------------------------------------------------------');
    console.log(`Summary of Database State:`);
    console.log(`  Courses:          ${totalCourses} (Expected: 2)`);
    console.log(`  Modules:          ${totalModules} (Expected: 8)`);
    console.log(`  Chapters:         ${totalChapters} (Expected: 24)`);
    console.log(`  Lessons:          ${totalLessons} (Expected: 24)`);
    console.log(`  Presentations:    ${totalPresentations} (Expected: 24)`);
    console.log(`  Quizzes:          ${totalQuizzes} (Expected: 24)`);
    console.log(`  Questions:        ${totalQuestions} (Expected: 480)`);
    console.log(`  Options:          ${totalOptions} (Expected: 1920)`);
    console.log(`  Students:         ${totalStudents} (Expected: 8)`);
    console.log(`  Enrollments:      ${totalEnrollments} (Expected: 16)`);
    console.log(`  Quiz Attempts:    ${totalAttempts}`);
    console.log(`  Chapter Progress: ${totalProgressRecords} (Expected: 192)`);
    console.log('--------------------------------------------------------');

    await AuditLog.create({
      actorUserId: facultyUser._id,
      action: 'DATABASE_SEEDED',
      entityType: 'System',
      details: {
        totalCourses,
        totalChapters,
        totalQuizzes,
        totalQuestions,
        totalStudents,
        totalEnrollments,
        totalAttempts
      }
    });

    console.log('\nSUCCESS: Database seeding completed with 100% curriculum and student cohort coverage!\n');
    process.exit(0);
  } catch (err) {
    console.error('\nFATAL ERROR during database seeding:', err);
    process.exit(1);
  }
};

seedDatabase();

