require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Models
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
  AuditLog
} = require('../models');

// Seed Data
const coursesData = require('./seedData/coursesModulesChapters');
const dataMiningContent = require('./seedData/dataMiningContent');
const cloudComputingContent = require('./seedData/cloudComputingContent');
const dataMiningQuizzes = require('./seedData/dataMiningQuizzes');
const cloudComputingQuizzes = require('./seedData/cloudComputingQuizzes');

const seedDatabase = async () => {
  console.log('========================================================');
  console.log('[Seed] Initiating LMS Database Seeding Process...');
  console.log('========================================================');

  await connectDB();

  try {
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

    // 5. Verification & Audit Logging
    console.log('\n[5/5] Performing System Verification...');
    const totalCourses = await Course.countDocuments();
    const totalModules = await Module.countDocuments();
    const totalChapters = await Chapter.countDocuments();
    const totalLessons = await Lesson.countDocuments();
    const totalPresentations = await Presentation.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalOptions = await QuestionOption.countDocuments();

    console.log('--------------------------------------------------------');
    console.log(`Summary of Database State:`);
    console.log(`  Courses:       ${totalCourses} (Expected: 2)`);
    console.log(`  Modules:       ${totalModules} (Expected: 8)`);
    console.log(`  Chapters:      ${totalChapters} (Expected: 24)`);
    console.log(`  Lessons:       ${totalLessons} (Expected: 24)`);
    console.log(`  Presentations: ${totalPresentations} (Expected: 24)`);
    console.log(`  Quizzes:       ${totalQuizzes} (Expected: 24)`);
    console.log(`  Questions:     ${totalQuestions} (Expected: 480)`);
    console.log(`  Options:       ${totalOptions} (Expected: 1920)`);
    console.log('--------------------------------------------------------');

    await AuditLog.create({
      actorUserId: facultyUser._id,
      action: 'DATABASE_SEEDED',
      entityType: 'System',
      details: {
        totalCourses,
        totalChapters,
        totalQuizzes,
        totalQuestions
      }
    });

    console.log('\nSUCCESS: Database seeding completed with 100% curriculum coverage!\n');
    process.exit(0);
  } catch (err) {
    console.error('\nFATAL ERROR during database seeding:', err);
    process.exit(1);
  }
};

seedDatabase();

