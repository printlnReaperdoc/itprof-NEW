const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const {
  Course,
  Chapter,
  Lesson,
  Presentation,
  LessonFile,
  Quiz,
  Question,
  QuestionOption,
  User
} = require('../models');

const {
  isCloudinaryConfigured,
  uploadFileToCloudinary,
  uploadBufferToCloudinary
} = require('../services/cloudinary.service');

const {
  generateQuizAnswerKeysPDF,
  generateChapterSummaryPDF
} = require('../services/export.service');

const { getChapterSummaryData } = require('../services/chapterSummary.service');
const PDFDocument = require('pdfkit');

/**
 * Generate a PDF slide deck from Presentation slides for a chapter
 */
const generatePresentationPDF = async (chapter, presentation) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 40, bottom: 40, left: 50, right: 50 }
      });

      const buffers = [];
      doc.on('data', b => buffers.push(b));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', err => reject(err));

      const slides = presentation?.slides || [];
      if (slides.length === 0) {
        doc.fontSize(24).fillColor('#0284c7').text(`Chapter ${chapter.chapterNumber}: ${chapter.title}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).fillColor('#475569').text('Lecture Slides and Materials', { align: 'center' });
        doc.end();
        return;
      }

      slides.forEach((slide, idx) => {
        if (idx > 0) doc.addPage();

        // Slide Header
        doc.rect(0, 0, doc.page.width, 65).fill('#0f172a');
        doc.fontSize(10).fillColor('#38bdf8').text(`CHAPTER ${chapter.chapterNumber} • LECTURE SLIDE ${slide.slideNumber || idx + 1}`, 50, 16);
        doc.fontSize(16).fillColor('#ffffff').text(slide.title || 'Slide Title', 50, 32);

        // Slide Content
        let currentY = 90;
        doc.fillColor('#1e293b');

        if (Array.isArray(slide.contentBlocks)) {
          slide.contentBlocks.forEach(block => {
            if (currentY > 480) return;

            if (block.type === 'text') {
              doc.fontSize(12).fillColor('#334155').text(String(block.content), 50, currentY, { width: 740 });
              currentY += doc.heightOfString(String(block.content), { width: 740 }) + 14;
            } else if (block.type === 'bullets' && Array.isArray(block.content)) {
              block.content.forEach(bullet => {
                if (currentY > 500) return;
                doc.fontSize(11).fillColor('#0284c7').text('• ', 60, currentY, { continued: true });
                doc.fillColor('#334155').text(String(bullet), { width: 710 });
                currentY += doc.heightOfString(String(bullet), { width: 710 }) + 8;
              });
              currentY += 8;
            } else if (block.type === 'callout') {
              doc.rect(50, currentY, 740, 50).fillAndStroke('#f0f9ff', '#0284c7');
              doc.fontSize(11).fillColor('#0369a1').text(String(block.content), 65, currentY + 16, { width: 710 });
              currentY += 65;
            } else if (block.type === 'code') {
              doc.rect(50, currentY, 740, 60).fill('#0f172a');
              doc.font('Courier').fontSize(9).fillColor('#38bdf8').text(String(block.content), 65, currentY + 12, { width: 710 });
              doc.font('Helvetica');
              currentY += 75;
            }
          });
        }

        // Slide Footer
        doc.rect(0, doc.page.height - 30, doc.page.width, 30).fill('#f8fafc');
        doc.fontSize(8).fillColor('#64748b').text(
          `IT Professional Electives LMS • Slide ${slide.slideNumber || idx + 1} of ${slides.length}`,
          50,
          doc.page.height - 20
        );
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

const run = async () => {
  console.log('======================================================================');
  console.log('   IT Professional Electives LMS - Cloudinary Asset Uploader');
  console.log('======================================================================\n');

  if (!isCloudinaryConfigured()) {
    console.error('ERROR: Cloudinary credentials are not configured in your environment.');
    console.log('\nPlease add your Cloudinary credentials to backend/.env:');
    console.log('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('  CLOUDINARY_API_KEY=your_api_key');
    console.log('  CLOUDINARY_API_SECRET=your_api_secret');
    console.log('Or:');
    console.log('  CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME\n');
    process.exit(1);
  }

  await connectDB();

  const results = {
    localFilesUploaded: [],
    masterAnswerKeysPDF: null,
    chapterDossierPDFs: [],
    presentationDecks: []
  };

  const facultyUser = await User.findOne({ role: 'faculty' }) || {
    firstName: 'System',
    surname: 'Administrator',
    username: 'admin',
    role: 'faculty'
  };

  // -------------------------------------------------------------------------
  // 1. Sync Existing Local Lesson Files in storage/uploads to Cloudinary
  // -------------------------------------------------------------------------
  console.log('1. Checking local uploaded materials in storage/uploads...');
  const localFiles = await LessonFile.find({
    $or: [{ cloudinaryUrl: null }, { cloudinaryUrl: { $exists: false } }]
  });

  for (const file of localFiles) {
    if (file.storagePath && fs.existsSync(file.storagePath)) {
      try {
        console.log(`   Uploading local file to Cloudinary: ${file.originalFilename}`);
        const ext = path.extname(file.originalFilename);
        const baseName = path.parse(file.originalFilename).name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const uploadRes = await uploadFileToCloudinary(file.storagePath, {
          folder: 'itprof/chapter-materials',
          public_id: `${baseName}_${Date.now()}${ext}`
        });

        file.cloudinaryUrl = uploadRes.secureUrl;
        file.cloudinaryPublicId = uploadRes.publicId;
        file.cloudinaryResourceType = uploadRes.resourceType;
        file.storageType = 'cloudinary';
        await file.save();

        results.localFilesUploaded.push({
          filename: file.originalFilename,
          url: uploadRes.secureUrl
        });
        console.log(`   ✓ Uploaded: ${uploadRes.secureUrl}`);
      } catch (err) {
        console.warn(`   ✗ Failed to upload ${file.originalFilename}:`, err.message);
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. Generate and Upload Master Quiz Answer Keys PDF
  // -------------------------------------------------------------------------
  console.log('\n2. Generating Master Quiz Answer Keys PDF for all 24 chapters...');
  try {
    const courses = await Course.find().sort({ courseCode: 1 });
    const coursesData = [];

    for (const course of courses) {
      const chapters = await Chapter.find({ courseId: course._id, isPublished: true }).sort({ chapterNumber: 1 });
      const chapterIds = chapters.map(c => c._id);
      const quizzes = await Quiz.find({ chapterId: { $in: chapterIds }, publicationStatus: 'published' });
      const quizIds = quizzes.map(q => q._id);
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

      const quizByChapter = new Map();
      quizzes.forEach(q => quizByChapter.set(q.chapterId.toString(), q));

      const chapterList = chapters.map(ch => {
        const q = quizByChapter.get(ch._id.toString());
        return {
          id: ch._id,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          quiz: q ? {
            id: q._id,
            title: q.title,
            passingScore: q.passingScore,
            questionCount: q.questionCount,
            questions: questionsByQuiz.get(q._id.toString()) || []
          } : null
        };
      });

      coursesData.push({
        id: course._id,
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        chapters: chapterList
      });
    }

    const masterPdfBuffer = await generateQuizAnswerKeysPDF({
      coursesData,
      requestedBy: facultyUser
    });

    console.log(`   Buffer generated (${(masterPdfBuffer.length / 1024).toFixed(1)} KB). Uploading to Cloudinary...`);
    const masterUpload = await uploadBufferToCloudinary(
      masterPdfBuffer,
      'IT_Prof_Electives_Master_Quiz_Answer_Keys.pdf',
      { folder: 'itprof/exports/answer-keys' }
    );
    results.masterAnswerKeysPDF = masterUpload.secureUrl;
    console.log(`   ✓ Master Answer Keys PDF uploaded: ${masterUpload.secureUrl}`);
  } catch (err) {
    console.error('   ✗ Failed generating/uploading master answer keys PDF:', err.message);
  }

  // -------------------------------------------------------------------------
  // 3. Generate & Upload Chapter Dossier PDFs & Slide Decks for all 24 chapters
  // -------------------------------------------------------------------------
  console.log('\n3. Processing all 24 chapters across Data Mining & Cloud Computing...');
  const chapters = await Chapter.find().populate('courseId').sort({ courseId: 1, chapterNumber: 1 });

  for (const chapter of chapters) {
    const courseCode = chapter.courseId?.courseCode || 'LMS';
    const chLabel = `${courseCode} - Chapter ${chapter.chapterNumber}: ${chapter.title}`;
    console.log(`\n   --- [${chLabel}] ---`);

    // A. Generate and Upload Chapter Summary Dossier PDF
    try {
      const summaryData = await getChapterSummaryData(chapter._id, { sortBy: 'surname', sortOrder: 'asc' });
      const dossierBuffer = await generateChapterSummaryPDF({
        summaryData,
        requestedBy: facultyUser
      });

      const dossierFilename = `${courseCode}_Ch${chapter.chapterNumber}_Dossier.pdf`;
      const dossierUpload = await uploadBufferToCloudinary(
        dossierBuffer,
        dossierFilename,
        { folder: `itprof/exports/dossiers/${courseCode}` }
      );

      results.chapterDossierPDFs.push({
        chapterNumber: chapter.chapterNumber,
        courseCode,
        title: chapter.title,
        url: dossierUpload.secureUrl
      });
      console.log(`   ✓ Dossier PDF uploaded: ${dossierUpload.secureUrl}`);
    } catch (err) {
      console.warn(`   ✗ Failed dossier PDF for Ch ${chapter.chapterNumber}:`, err.message);
    }

    // B. Check or generate Chapter Presentation Slide Deck PDF
    try {
      const presentation = await Presentation.findOne({ chapterId: chapter._id });
      if (presentation && presentation.slides && presentation.slides.length > 0) {
        // Check if an existing LessonFile already has a Cloudinary URL
        let existingFile = await LessonFile.findOne({ chapterId: chapter._id, cloudinaryUrl: { $ne: null } });

        if (!existingFile) {
          console.log(`   Generating slide deck presentation PDF (${presentation.slides.length} slides)...`);
          const deckBuffer = await generatePresentationPDF(chapter, presentation);
          const deckFilename = `${courseCode}_Ch${chapter.chapterNumber}_Lecture_Slides.pdf`;

          const deckUpload = await uploadBufferToCloudinary(
            deckBuffer,
            deckFilename,
            { folder: `itprof/chapter-materials/ch_${chapter.chapterNumber}` }
          );

          // Create LessonFile record so it appears on the Chapter page immediately
          const newLessonFile = await LessonFile.create({
            chapterId: chapter._id,
            originalFilename: deckFilename,
            storedFilename: path.basename(deckUpload.secureUrl),
            storagePath: deckUpload.secureUrl,
            mimeType: 'application/pdf',
            fileSize: deckBuffer.length,
            uploadedBy: facultyUser._id,
            cloudinaryUrl: deckUpload.secureUrl,
            cloudinaryPublicId: deckUpload.publicId,
            cloudinaryResourceType: deckUpload.resourceType,
            storageType: 'cloudinary'
          });

          results.presentationDecks.push({
            chapterNumber: chapter.chapterNumber,
            courseCode,
            title: chapter.title,
            url: deckUpload.secureUrl,
            fileId: newLessonFile._id
          });
          console.log(`   ✓ Presentation Slide Deck PDF uploaded & linked: ${deckUpload.secureUrl}`);
        } else {
          console.log(`   ✓ Existing deck already on Cloudinary: ${existingFile.cloudinaryUrl}`);
          results.presentationDecks.push({
            chapterNumber: chapter.chapterNumber,
            courseCode,
            title: chapter.title,
            url: existingFile.cloudinaryUrl,
            fileId: existingFile._id
          });
        }
      }
    } catch (err) {
      console.warn(`   ✗ Failed slide deck for Ch ${chapter.chapterNumber}:`, err.message);
    }
  }

  console.log('\n======================================================================');
  console.log('   Cloudinary Upload Completed Successfully!');
  console.log('======================================================================');
  console.log(`• Master Answer Keys PDF: ${results.masterAnswerKeysPDF || 'N/A'}`);
  console.log(`• Chapter Dossier PDFs:   ${results.chapterDossierPDFs.length} uploaded`);
  console.log(`• Chapter Slide Decks:    ${results.presentationDecks.length} uploaded and linked to chapters`);
  console.log('======================================================================\n');

  await mongoose.connection.close(false);
  process.exit(0);
};

run().catch(err => {
  console.error('\nFatal error running Cloudinary upload:', err);
  process.exit(1);
});

