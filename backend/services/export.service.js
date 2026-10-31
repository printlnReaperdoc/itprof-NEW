const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

/**
 * Sanitize cell values against spreadsheet formula injection
 */
const sanitizeCellValue = (val) => {
  if (val === null || val === undefined) return '';
  const str = String(val);
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some(p => str.startsWith(p))) {
    return `'${str}`;
  }
  return str;
};

/**
 * Generate Master Gradebook XLSX
 */
const generateMasterGradebookXLSX = async ({ course, students, chapters, gradeMatrix }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'University IT Professional Electives LMS';
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet(`${course.courseCode} Master Gradebook`);

  // Course Title & Metadata header
  worksheet.addRow([sanitizeCellValue(course.courseTitle)]);
  worksheet.addRow([`Course Code: ${course.courseCode} | Classification: ${course.classification}`]);
  worksheet.addRow([`Academic Level: ${course.academicYearLevel} | Term: ${course.term} | Designation: ${course.academicDesignation}`]);
  worksheet.addRow([`Exported on: ${new Date().toLocaleString()}`]);
  worksheet.addRow([]); // Blank line

  // Column Headers
  const headerCols = [
    'Student Username',
    'Surname',
    'First Name'
  ];

  chapters.forEach(ch => {
    headerCols.push(`Ch ${ch.chapterNumber} Highest`);
    headerCols.push(`Ch ${ch.chapterNumber} Status`);
  });

  headerCols.push('Chapters Attempted');
  headerCols.push('Chapters Passed');
  headerCols.push('Overall Average (%)');
  headerCols.push('Completion (%)');

  const headerRow = worksheet.addRow(headerCols);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E293B' } // Slate-800
  };

  // Populate student rows
  students.forEach(student => {
    const studentData = gradeMatrix[student._id.toString()] || {};
    const row = [
      sanitizeCellValue(student.username),
      sanitizeCellValue(student.surname),
      sanitizeCellValue(student.firstName)
    ];

    chapters.forEach(ch => {
      const chData = studentData.chapters?.[ch._id.toString()];
      if (chData && chData.attemptsCount > 0) {
        row.push(chData.highestScore);
        row.push(chData.status ? chData.status.toUpperCase() : 'ATTEMPTED');
      } else {
        row.push('Not Attempted');
        row.push('NOT ATTEMPTED');
      }
    });

    row.push(studentData.chaptersAttempted ?? 0);
    row.push(studentData.chaptersPassed ?? 0);
    row.push(studentData.overallAverage !== null ? `${studentData.overallAverage}%` : 'N/A');
    row.push(`${studentData.completionPercentage ?? 0}%`);

    worksheet.addRow(row);
  });

  // Adjust column widths
  worksheet.columns.forEach(col => {
    col.width = 18;
  });
  worksheet.getColumn(1).width = 20;
  worksheet.getColumn(2).width = 20;
  worksheet.getColumn(3).width = 20;

  return workbook.xlsx.writeBuffer();
};

/**
 * Generate Master Gradebook CSV
 */
const generateMasterGradebookCSV = async ({ course, students, chapters, gradeMatrix }) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Master Gradebook');

  const headerCols = ['Student Username', 'Surname', 'First Name'];
  chapters.forEach(ch => {
    headerCols.push(`Ch${ch.chapterNumber}_Score`);
    headerCols.push(`Ch${ch.chapterNumber}_Status`);
  });
  headerCols.push('Chapters_Attempted', 'Chapters_Passed', 'Overall_Average_Pct', 'Completion_Pct');

  worksheet.addRow(headerCols);

  students.forEach(student => {
    const studentData = gradeMatrix[student._id.toString()] || {};
    const row = [
      sanitizeCellValue(student.username),
      sanitizeCellValue(student.surname),
      sanitizeCellValue(student.firstName)
    ];

    chapters.forEach(ch => {
      const chData = studentData.chapters?.[ch._id.toString()];
      if (chData && chData.attemptsCount > 0) {
        row.push(chData.highestScore);
        row.push(chData.status ? chData.status.toUpperCase() : 'ATTEMPTED');
      } else {
        row.push('Not Attempted');
        row.push('NOT ATTEMPTED');
      }
    });

    row.push(studentData.chaptersAttempted ?? 0);
    row.push(studentData.chaptersPassed ?? 0);
    row.push(studentData.overallAverage !== null ? studentData.overallAverage : 'N/A');
    row.push(studentData.completionPercentage ?? 0);

    worksheet.addRow(row);
  });

  return workbook.csv.writeBuffer();
};

/**
 * Generate Topic Gradebook XLSX
 */
const generateTopicGradebookXLSX = async ({ course, chapter, records }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'University IT LMS';
  const worksheet = workbook.addWorksheet(`Ch ${chapter.chapterNumber} Gradebook`);

  worksheet.addRow([sanitizeCellValue(course.courseTitle)]);
  worksheet.addRow([`Chapter ${chapter.chapterNumber}: ${sanitizeCellValue(chapter.title)}`]);
  worksheet.addRow([`Exported: ${new Date().toLocaleString()}`]);
  worksheet.addRow([]);

  const headers = [
    'Username',
    'Surname',
    'First Name',
    'Attempts',
    'Latest Score (out of 20)',
    'Highest Score (out of 20)',
    'Score %',
    'Result',
    'Latest Attempt Date',
    'Completion Status'
  ];

  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E293B' }
  };

  records.forEach(r => {
    worksheet.addRow([
      sanitizeCellValue(r.username),
      sanitizeCellValue(r.surname),
      sanitizeCellValue(r.firstName),
      r.attemptsCount ?? 0,
      r.latestScore !== null ? r.latestScore : 'Not Attempted',
      r.highestScore !== null ? r.highestScore : 'Not Attempted',
      r.highestScorePercentage !== null ? `${r.highestScorePercentage}%` : 'N/A',
      r.isPassed ? 'PASSED' : (r.attemptsCount > 0 ? 'FAILED' : 'NOT ATTEMPTED'),
      r.latestAttemptAt ? new Date(r.latestAttemptAt).toLocaleString() : 'N/A',
      r.status ? r.status.toUpperCase() : 'LOCKED'
    ]);
  });

  worksheet.columns.forEach(col => { col.width = 18; });
  return workbook.xlsx.writeBuffer();
};

/**
 * Generate Master Gradebook PDF
 */
const generateMasterGradebookPDF = ({ course, students, chapters, gradeMatrix }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Title & Header
      doc.fontSize(16).font('Helvetica-Bold').text(course.courseTitle, { align: 'center' });
      doc.fontSize(10).font('Helvetica').text(`Course Code: ${course.courseCode} | Level: ${course.academicYearLevel} | Term: ${course.term}`, { align: 'center' });
      doc.fontSize(9).font('Helvetica-Oblique').text(`Master Gradebook Report - Generated on ${new Date().toLocaleString()}`, { align: 'center' });
      doc.moveDown(1);

      // Summary Table
      doc.fontSize(8).font('Helvetica-Bold');
      const startX = 30;
      let currentY = doc.y;

      // Header row
      doc.rect(startX, currentY, 780, 20).fill('#1e293b');
      doc.fillColor('#ffffff')
        .text('Student', startX + 5, currentY + 5, { width: 110 })
        .text('C1', startX + 120, currentY + 5, { width: 25 })
        .text('C2', startX + 150, currentY + 5, { width: 25 })
        .text('C3', startX + 180, currentY + 5, { width: 25 })
        .text('C4', startX + 210, currentY + 5, { width: 25 })
        .text('C5', startX + 240, currentY + 5, { width: 25 })
        .text('C6', startX + 270, currentY + 5, { width: 25 })
        .text('C7', startX + 300, currentY + 5, { width: 25 })
        .text('C8', startX + 330, currentY + 5, { width: 25 })
        .text('C9', startX + 360, currentY + 5, { width: 25 })
        .text('C10', startX + 390, currentY + 5, { width: 25 })
        .text('C11', startX + 420, currentY + 5, { width: 25 })
        .text('C12', startX + 450, currentY + 5, { width: 25 })
        .text('Attempted', startX + 485, currentY + 5, { width: 60 })
        .text('Passed', startX + 555, currentY + 5, { width: 50 })
        .text('Average', startX + 615, currentY + 5, { width: 60 })
        .text('Completion', startX + 685, currentY + 5, { width: 70 });

      currentY += 22;
      doc.font('Helvetica').fontSize(8);

      students.forEach((student, idx) => {
        if (currentY > 530) {
          doc.addPage({ margin: 30, size: 'A4', layout: 'landscape' });
          currentY = 40;
        }

        const studentData = gradeMatrix[student._id.toString()] || {};
        const bg = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
        doc.rect(startX, currentY, 780, 18).fill(bg);
        doc.fillColor('#0f172a');

        doc.text(`${student.surname}, ${student.firstName} (${student.username})`, startX + 5, currentY + 4, { width: 110, lineBreak: false });

        chapters.forEach((ch, chIdx) => {
          const chData = studentData.chapters?.[ch._id.toString()];
          const val = chData && chData.attemptsCount > 0 ? `${chData.highestScore}` : '-';
          const colX = startX + 120 + (chIdx * 30);
          doc.text(val, colX, currentY + 4, { width: 25 });
        });

        doc.text(String(studentData.chaptersAttempted ?? 0), startX + 490, currentY + 4);
        doc.text(`${studentData.chaptersPassed ?? 0} / 12`, startX + 560, currentY + 4);
        doc.text(studentData.overallAverage !== null ? `${studentData.overallAverage}%` : 'N/A', startX + 620, currentY + 4);
        doc.text(`${studentData.completionPercentage ?? 0}%`, startX + 690, currentY + 4);

        currentY += 19;
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Quiz Answer Keys Master PDF (Faculty only)
 */
const generateQuizAnswerKeysPDF = ({ coursesData, requestedBy }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4', bufferPages: true });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header Banner
      doc.rect(40, 40, 515, 60).fill('#0f172a');
      doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold')
        .text('UNIVERSITY LEARNING MANAGEMENT SYSTEM', 50, 48, { align: 'center', width: 495 });
      doc.fontSize(10).font('Helvetica')
        .text('FACULTY MASTER ASSESSMENT REFERENCE: OFFICIAL QUIZ ANSWER KEYS', 50, 66, { align: 'center', width: 495 });
      doc.fontSize(8).font('Helvetica-Oblique').fillColor('#94a3b8')
        .text('IT Professional Elective 2 (Data Mining) & IT Professional Elective 4 (Cloud Computing)', 50, 82, { align: 'center', width: 495 });

      doc.y = 112;

      // Metadata Box
      doc.rect(40, 110, 515, 42).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.fillColor('#1e293b').fontSize(8).font('Helvetica-Bold')
        .text('DOCUMENT METADATA & CONFIDENTIALITY NOTICE', 50, 116);
      doc.font('Helvetica').fontSize(7.5).fillColor('#334155')
        .text(`Authorized Faculty: ${requestedBy?.firstName || ''} ${requestedBy?.surname || ''} (@${requestedBy?.username || 'faculty'}) | Role: ${requestedBy?.role?.toUpperCase() || 'FACULTY'}`, 50, 128)
        .text(`Export Timestamp: ${new Date().toLocaleString()} | Security Classification: Strictly Confidential - Faculty Assessment Material`, 50, 138);

      doc.y = 162;

      // Iterate through courses
      coursesData.forEach((course, courseIdx) => {
        if (courseIdx > 0) {
          doc.addPage();
          doc.y = 40;
        }

        // Course Section Banner
        doc.rect(40, doc.y, 515, 26).fill('#0284c7');
        doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold')
          .text(`${course.courseCode}: ${course.courseTitle}`, 50, doc.y + 7, { width: 495 });
        doc.y += 34;

        course.chapters.forEach((chapter) => {
          if (doc.y > 640) {
            doc.addPage();
            doc.y = 40;
          }

          // Chapter Header
          doc.rect(40, doc.y, 515, 20).fill('#1e293b');
          doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
            .text(`Chapter ${chapter.chapterNumber}: ${chapter.title}`, 48, doc.y + 5, { width: 360 });
          doc.font('Helvetica').fontSize(8).fillColor('#38bdf8')
            .text(`Passing: 15/20 (75%) | 20 Questions`, 415, doc.y + 6, { width: 135, align: 'right' });
          doc.y += 26;

          const quiz = chapter.quiz;
          if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            doc.fillColor('#64748b').fontSize(8).font('Helvetica-Oblique')
              .text('No active assessment questions configured for this chapter.', 50, doc.y);
            doc.y += 15;
            return;
          }

          // Compact Quick Answer Key Strip (2 rows of 10)
          const startStripY = doc.y;
          doc.rect(40, startStripY, 515, 32).fillAndStroke('#f1f5f9', '#cbd5e1');
          doc.fillColor('#0f172a').fontSize(7.5).font('Helvetica-Bold')
            .text('QUICK KEY MATRIX:', 46, startStripY + 5);

          // Row 1: Q1 to Q10
          const row1Text = quiz.questions.slice(0, 10).map(q => `Q${q.position}: ${q.correctOption || '?'}`).join('  |  ');
          doc.font('Helvetica-Bold').fontSize(7).fillColor('#0369a1')
            .text(row1Text, 140, startStripY + 5);

          // Row 2: Q11 to Q20
          const row2Text = quiz.questions.slice(10, 20).map(q => `Q${q.position}: ${q.correctOption || '?'}`).join('  |  ');
          doc.text(row2Text, 140, startStripY + 18);

          doc.y = startStripY + 38;

          // Full Questions
          quiz.questions.forEach((q) => {
            if (doc.y > 690) {
              doc.addPage();
              doc.y = 40;
            }

            // Question Stem
            doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold')
              .text(`Q${q.position}. ${q.questionText} (${q.points || 1} pt)`, 45, doc.y, { width: 505 });
            doc.y += 2;

            // Options
            if (q.options && q.options.length > 0) {
              q.options.forEach((opt) => {
                if (doc.y > 730) {
                  doc.addPage();
                  doc.y = 40;
                }

                if (opt.isCorrect) {
                  doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(7.5)
                    .text(`[✓] ${opt.label}. ${opt.optionText}  <-- CORRECT ANSWER KEY`, 55, doc.y, { width: 495 });
                } else {
                  doc.fillColor('#475569').font('Helvetica').fontSize(7.5)
                    .text(`[  ] ${opt.label}. ${opt.optionText}`, 55, doc.y, { width: 495 });
                }
              });
            }
            doc.moveDown(0.35);
          });

          doc.moveDown(0.5);
        });
      });

      // Add Page Numbers to all pages
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
          .text(
            `Page ${i + 1} of ${pages.count}  •  IT Professional Electives LMS  •  Faculty Assessment Master Key`,
            40,
            doc.page.height - 25,
            { align: 'center', width: doc.page.width - 80 }
          );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Comprehensive Chapter Summary & Documents Dossier PDF (Faculty Only)
 */
const generateChapterSummaryPDF = async ({ summaryData, requestedBy }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 35, bottom: 35, left: 40, right: 40 },
        bufferPages: true
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const { chapter, course, module: mod, lesson, presentation, quiz, cohort, records, sorting } = summaryData;

      // Header Banner
      doc.rect(40, 35, 515, 65).fill('#0f172a');
      doc.fillColor('#38bdf8').fontSize(9).font('Helvetica-Bold')
        .text('UNIVERSITY LEARNING MANAGEMENT SYSTEM', 50, 44, { align: 'center', width: 495 });
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#ffffff')
        .text('OFFICIAL CHAPTER CURRICULUM DOSSIER & EVALUATION SUMMARY', 50, 58, { align: 'center', width: 495 });
      doc.fontSize(8.5).font('Helvetica-Oblique').fillColor('#94a3b8')
        .text(`${course.courseCode}: ${course.courseTitle}  |  Module ${mod?.moduleNumber || ''}: ${mod?.title || ''}`, 50, 74, { align: 'center', width: 495 })
        .text(`Chapter ${chapter.chapterNumber}: ${chapter.title}`, 50, 86, { align: 'center', width: 495 });

      doc.y = 108;

      // Metadata Box
      doc.rect(40, 108, 515, 38).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.fillColor('#1e293b').fontSize(7.5).font('Helvetica-Bold')
        .text('DOCUMENT METADATA & FACULTY CONFIDENTIALITY ARCHIVE', 48, 113);
      doc.font('Helvetica').fontSize(7).fillColor('#334155')
        .text(`Authorized Faculty: ${requestedBy?.firstName || ''} ${requestedBy?.surname || ''} (@${requestedBy?.username || 'faculty'}) | Role: ${requestedBy?.role?.toUpperCase() || 'FACULTY'}`, 48, 124)
        .text(`Export Timestamp: ${new Date().toLocaleString()} | Sort Criterion: ${sorting.sortBy.toUpperCase()} (${sorting.sortOrder.toUpperCase()}) | Security: Faculty Restricted`, 48, 134);

      doc.y = 154;

      // Section 1: Curriculum Lesson & Instructional Objectives
      doc.rect(40, doc.y, 515, 18).fill('#0284c7');
      doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
        .text('SECTION 1: CURRICULUM LESSON SYLLABUS & INSTRUCTIONAL OBJECTIVES', 46, doc.y + 5, { width: 503 });
      doc.y += 24;

      if (chapter.description) {
        doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Chapter Description:', 45, doc.y);
        doc.fillColor('#334155').fontSize(7.5).font('Helvetica').text(chapter.description, 45, doc.y + 10, { width: 505, lineHeight: 1.3 });
        doc.y += doc.heightOfString(chapter.description, { width: 505 }) + 14;
      }

      if (lesson) {
        if (lesson.overview) {
          doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Lesson Overview:', 45, doc.y);
          doc.fillColor('#334155').fontSize(7.5).font('Helvetica').text(lesson.overview, 45, doc.y + 10, { width: 505, lineHeight: 1.3 });
          doc.y += doc.heightOfString(lesson.overview, { width: 505 }) + 14;
        }

        if (lesson.learningObjectives && lesson.learningObjectives.length > 0) {
          doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Core Learning Objectives:', 45, doc.y);
          doc.y += 12;
          lesson.learningObjectives.forEach(obj => {
            doc.fillColor('#0369a1').font('Helvetica-Bold').fontSize(7.5).text('• ', 48, doc.y);
            doc.fillColor('#334155').font('Helvetica').fontSize(7.5).text(obj, 58, doc.y, { width: 490 });
            doc.y += 11;
          });
          doc.y += 4;
        }

        if (lesson.keyConcepts && lesson.keyConcepts.length > 0) {
          doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Key Technical Terminology:', 45, doc.y);
          doc.y += 12;
          lesson.keyConcepts.slice(0, 6).forEach(kc => {
            doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7).text(`${kc.term}: `, 48, doc.y, { continued: true });
            doc.fillColor('#475569').font('Helvetica').fontSize(7).text(kc.definition, { width: 495 });
            doc.y += 10;
          });
          doc.y += 6;
        }

        if (lesson.citations && lesson.citations.length > 0) {
          if (doc.y > 660) { doc.addPage(); doc.y = 40; }
          doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Academic References & Citations (APA 7th Edition):', 45, doc.y);
          doc.y += 12;
          lesson.citations.forEach(cit => {
            if (doc.y > 740) { doc.addPage(); doc.y = 40; }
            doc.fillColor('#0369a1').font('Helvetica-Bold').fontSize(7).text('[APA 7th] ', 48, doc.y, { continued: true });
            doc.fillColor('#334155').font('Helvetica').fontSize(7).text(cit.citationText, { width: 490 });
            doc.y += doc.heightOfString(cit.citationText, { width: 490 }) + 2;

            if (cit.url) {
              doc.fillColor('#0284c7').font('Helvetica').fontSize(6.5).text(cit.url, 58, doc.y, {
                link: cit.url,
                underline: true
              });
              doc.y += 10;
            }
            doc.y += 3;
          });
          doc.y += 6;
        }

        if (lesson.videos && lesson.videos.length > 0) {
          if (doc.y > 680) { doc.addPage(); doc.y = 40; }
          doc.fillColor('#0f172a').fontSize(8).font('Helvetica-Bold').text('Curated Educational Video Lectures (YouTube):', 45, doc.y);
          doc.y += 12;
          lesson.videos.forEach(vid => {
            if (doc.y > 740) { doc.addPage(); doc.y = 40; }
            doc.fillColor('#dc2626').font('Helvetica-Bold').fontSize(7).text('[YouTube Media] ', 48, doc.y, { continued: true });
            doc.fillColor('#334155').font('Helvetica').fontSize(7).text(`${vid.title} (${vid.channel || 'Educational Resource'})`, { width: 490 });
            doc.y += 10;
            if (vid.youtubeUrl) {
              doc.fillColor('#0284c7').font('Helvetica').fontSize(6.5).text(vid.youtubeUrl, 58, doc.y, {
                link: vid.youtubeUrl,
                underline: true
              });
              doc.y += 10;
            }
            doc.y += 2;
          });
          doc.y += 6;
        }
      }

      // Check page break
      if (doc.y > 640) { doc.addPage(); doc.y = 40; }

      // Section 2: Interactive Presentation Outline
      doc.rect(40, doc.y, 515, 18).fill('#0284c7');
      doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
        .text(`SECTION 2: INTERACTIVE PRESENTATION DECK (${presentation?.slideCount || 0} SLIDES)`, 46, doc.y + 5, { width: 503 });
      doc.y += 24;

      if (presentation && presentation.slides && presentation.slides.length > 0) {
        presentation.slides.forEach(sl => {
          if (doc.y > 720) { doc.addPage(); doc.y = 40; }
          doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.5)
            .text(`Slide ${sl.slideNumber}: ${sl.title}  [${sl.slideType || 'standard'}]`, 48, doc.y);
          doc.y += 10;
          if (sl.bulletPoints && sl.bulletPoints.length > 0) {
            sl.bulletPoints.forEach(bp => {
              doc.fillColor('#64748b').font('Helvetica').fontSize(7).text(`- ${bp}`, 60, doc.y, { width: 480 });
              doc.y += 9;
            });
          }
          doc.y += 2;
        });
      } else {
        doc.fillColor('#64748b').font('Helvetica-Oblique').fontSize(7.5).text('No slides configured.', 48, doc.y);
        doc.y += 12;
      }
      doc.y += 6;

      // Section 3: Assessment Specification & 20-Question Key Matrix
      if (doc.y > 600) { doc.addPage(); doc.y = 40; }

      doc.rect(40, doc.y, 515, 18).fill('#0284c7');
      doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
        .text('SECTION 3: ASSESSMENT SPECIFICATION & 20-QUESTION ANSWER KEYS', 46, doc.y + 5, { width: 503 });
      doc.y += 24;

      // Benchmarks Strip
      doc.rect(40, doc.y, 515, 20).fill('#f1f5f9');
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.5)
        .text(`Questions: ${quiz?.questionCount || 20}   |   Time Limit: ${Math.floor((quiz?.timeLimitSeconds || 600) / 60)} Mins   |   Pass Threshold: ${quiz?.passingScore || 15}/20 (75%)   |   Version: ${quiz?.version || 1}`, 48, doc.y + 5);
      doc.y += 26;

      if (quiz && quiz.questions && quiz.questions.length > 0) {
        // Quick Key Strip
        const stripY = doc.y;
        doc.rect(40, stripY, 515, 28).fillAndStroke('#f8fafc', '#cbd5e1');
        doc.fillColor('#0f172a').fontSize(7.5).font('Helvetica-Bold').text('QUICK KEYS:', 46, stripY + 5);

        const r1 = quiz.questions.slice(0, 10).map(q => `Q${q.position}: ${q.correctOption || '?'}`).join('  |  ');
        doc.font('Helvetica-Bold').fontSize(7).fillColor('#0369a1').text(r1, 115, stripY + 5);

        const r2 = quiz.questions.slice(10, 20).map(q => `Q${q.position}: ${q.correctOption || '?'}`).join('  |  ');
        doc.text(r2, 115, stripY + 16);
        doc.y = stripY + 34;

        // Print questions list
        quiz.questions.forEach(q => {
          if (doc.y > 700) { doc.addPage(); doc.y = 40; }
          doc.fillColor('#0f172a').fontSize(7.5).font('Helvetica-Bold')
            .text(`Q${q.position}. ${q.questionText}`, 45, doc.y, { width: 505 });
          doc.y += 10;
          if (q.options) {
            q.options.forEach(opt => {
              if (doc.y > 735) { doc.addPage(); doc.y = 40; }
              if (opt.isCorrect) {
                doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(7)
                  .text(`[✓] ${opt.label}. ${opt.text}  <-- CORRECT KEY`, 55, doc.y, { width: 495 });
              } else {
                doc.fillColor('#64748b').font('Helvetica').fontSize(7)
                  .text(`[  ] ${opt.label}. ${opt.text}`, 55, doc.y, { width: 495 });
              }
              doc.y += 9;
            });
          }
          doc.y += 3;
        });
      }

      // Section 4: Cohort Assessment Performance Summary
      doc.addPage();
      doc.y = 40;

      doc.rect(40, doc.y, 515, 18).fill('#0284c7');
      doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
        .text('SECTION 4: COHORT ASSESSMENT PERFORMANCE SUMMARY', 46, doc.y + 5, { width: 503 });
      doc.y += 24;

      // KPI Metric Cards
      const cardW = 98;
      const cardH = 46;
      const startX = 40;
      const kpis = [
        { label: 'ENROLLED', val: String(cohort.totalEnrolled), color: '#0f172a' },
        { label: 'ATTEMPTED', val: String(cohort.attemptedCount), color: '#0284c7' },
        { label: 'PASSED', val: String(cohort.passedCount), color: '#16a34a' },
        { label: 'PASS RATE', val: `${cohort.passRate}%`, color: '#16a34a' },
        { label: 'CLASS AVG', val: cohort.averageScore !== null ? `${cohort.averageScore}/20` : 'N/A', color: '#9333ea' }
      ];

      kpis.forEach((kpi, idx) => {
        const x = startX + idx * (cardW + 6);
        doc.rect(x, doc.y, cardW, cardH).fillAndStroke('#f8fafc', '#cbd5e1');
        doc.fillColor('#64748b').fontSize(6.5).font('Helvetica-Bold').text(kpi.label, x, doc.y + 6, { align: 'center', width: cardW });
        doc.fillColor(kpi.color).fontSize(13).font('Helvetica-Bold').text(kpi.val, x, doc.y + 20, { align: 'center', width: cardW });
      });

      doc.y += cardH + 18;

      // Section 5: Official Student Evaluation Roster
      doc.rect(40, doc.y, 515, 18).fill('#0f172a');
      doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
        .text(`SECTION 5: OFFICIAL STUDENT EVALUATION ROSTER (SORTED BY ${sorting.sortBy.toUpperCase()} ${sorting.sortOrder.toUpperCase()})`, 46, doc.y + 5, { width: 503 });
      doc.y += 24;

      // Table Header
      const colX = {
        rank: 45,
        username: 65,
        name: 145,
        attempts: 275,
        score: 325,
        status: 395,
        date: 455
      };

      doc.rect(40, doc.y, 515, 16).fill('#1e293b');
      doc.fillColor('#ffffff').fontSize(7).font('Helvetica-Bold');
      doc.text('#', colX.rank, doc.y + 4);
      doc.text('STUDENT ID', colX.username, doc.y + 4);
      doc.text('STUDENT NAME', colX.name, doc.y + 4);
      doc.text('ATTEMPTS', colX.attempts, doc.y + 4);
      doc.text('BEST SCORE', colX.score, doc.y + 4);
      doc.text('STATUS', colX.status, doc.y + 4);
      doc.text('COMPLETED AT', colX.date, doc.y + 4);
      doc.y += 18;

      // Table Rows
      records.forEach((rec, idx) => {
        if (doc.y > 740) {
          doc.addPage();
          doc.y = 40;
          doc.rect(40, doc.y, 515, 16).fill('#1e293b');
          doc.fillColor('#ffffff').fontSize(7).font('Helvetica-Bold');
          doc.text('#', colX.rank, doc.y + 4);
          doc.text('STUDENT ID', colX.username, doc.y + 4);
          doc.text('STUDENT NAME', colX.name, doc.y + 4);
          doc.text('ATTEMPTS', colX.attempts, doc.y + 4);
          doc.text('BEST SCORE', colX.score, doc.y + 4);
          doc.text('STATUS', colX.status, doc.y + 4);
          doc.text('COMPLETED AT', colX.date, doc.y + 4);
          doc.y += 18;
        }

        const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        doc.rect(40, doc.y, 515, 16).fill(bg);

        doc.fillColor('#0f172a').fontSize(7).font('Helvetica');
        doc.text(String(rec.rank), colX.rank, doc.y + 4);
        doc.text(rec.username, colX.username, doc.y + 4);
        doc.font('Helvetica-Bold').text(rec.fullName, colX.name, doc.y + 4);
        doc.font('Helvetica').text(String(rec.attemptsCount), colX.attempts, doc.y + 4);

        if (rec.highestScore !== null) {
          const scoreColor = rec.isPassed ? '#16a34a' : '#dc2626';
          doc.font('Helvetica-Bold').fillColor(scoreColor)
            .text(`${rec.highestScore}/20 (${rec.highestScorePercentage}%)`, colX.score, doc.y + 4);
        } else {
          doc.fillColor('#94a3b8').text('No attempt', colX.score, doc.y + 4);
        }

        if (rec.status === 'passed') {
          doc.fillColor('#16a34a').font('Helvetica-Bold').text('PASSED', colX.status, doc.y + 4);
        } else if (rec.status === 'failed') {
          doc.fillColor('#dc2626').font('Helvetica-Bold').text('FAILED', colX.status, doc.y + 4);
        } else {
          doc.fillColor('#64748b').font('Helvetica').text(rec.status ? rec.status.toUpperCase() : 'NOT ATTEMPTED', colX.status, doc.y + 4);
        }

        const dateStr = rec.latestAttemptAt ? new Date(rec.latestAttemptAt).toLocaleDateString() : '—';
        doc.fillColor('#64748b').font('Helvetica').text(dateStr, colX.date, doc.y + 4);

        doc.y += 16;
      });

      // Page numbers footer
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fillColor('#94a3b8').fontSize(7).font('Helvetica')
          .text(
            `Page ${i + 1} of ${pages.count}  •  IT Professional Electives LMS  •  Chapter ${chapter.chapterNumber} Dossier (Confidential)`,
            40,
            doc.page.height - 24,
            { align: 'center', width: doc.page.width - 80 }
          );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Chapter Summary & Cohort Evaluation XLSX (Faculty Only)
 */
const generateChapterSummaryXLSX = async ({ summaryData }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'University IT Professional Electives LMS';
  workbook.created = new Date();

  const { chapter, course, module: mod, lesson, presentation, quiz, cohort, records, sorting } = summaryData;

  // Sheet 1: Specifications & Metadata
  const wsSpec = workbook.addWorksheet('Chapter Specifications');

  wsSpec.addRow([sanitizeCellValue(course.courseTitle)]);
  wsSpec.addRow([`Course Code: ${course.courseCode} | Chapter ${chapter.chapterNumber}: ${chapter.title}`]);
  wsSpec.addRow([`Module ${mod?.moduleNumber || ''}: ${mod?.title || ''}`]);
  wsSpec.addRow([`Sort Criterion Applied: ${sorting.sortBy.toUpperCase()} (${sorting.sortOrder.toUpperCase()})`]);
  wsSpec.addRow([`Generated on: ${new Date().toLocaleString()}`]);
  wsSpec.addRow([]);

  wsSpec.addRow(['COHORT ASSESSMENT PERFORMANCE METRICS']);
  wsSpec.addRow(['Total Enrolled Students', cohort.totalEnrolled]);
  wsSpec.addRow(['Students Attempted', cohort.attemptedCount]);
  wsSpec.addRow(['Students Passed', cohort.passedCount]);
  wsSpec.addRow(['Cohort Pass Rate (%)', `${cohort.passRate}%`]);
  wsSpec.addRow(['Class Average Score (/20)', cohort.averageScore !== null ? `${cohort.averageScore} / 20 (${cohort.averagePercentage}%)` : 'N/A']);
  wsSpec.addRow(['Highest Score', cohort.highestScore !== null ? `${cohort.highestScore} / 20` : 'N/A']);
  wsSpec.addRow(['Lowest Score', cohort.lowestScore !== null ? `${cohort.lowestScore} / 20` : 'N/A']);
  wsSpec.addRow([]);

  if (lesson?.learningObjectives?.length) {
    wsSpec.addRow(['LEARNING OBJECTIVES']);
    lesson.learningObjectives.forEach((obj, i) => {
      wsSpec.addRow([`Objective ${i + 1}`, sanitizeCellValue(obj)]);
    });
    wsSpec.addRow([]);
  }

  if (quiz?.questions?.length) {
    wsSpec.addRow(['ASSESSMENT QUESTIONS & OFFICIAL ANSWER KEYS']);
    const qHeader = wsSpec.addRow(['Q#', 'Question Text', 'Correct Option', 'Correct Answer Text', 'Points']);
    qHeader.font = { bold: true };
    quiz.questions.forEach(q => {
      wsSpec.addRow([
        q.position,
        sanitizeCellValue(q.questionText),
        q.correctOption,
        sanitizeCellValue(q.correctAnswerText),
        q.points
      ]);
    });
  }

  wsSpec.columns.forEach(col => { col.width = 24; });
  wsSpec.getColumn(2).width = 45;

  // Sheet 2: Cohort Assessment Roster
  const wsRoster = workbook.addWorksheet('Cohort Assessment Roster');

  wsRoster.addRow([`Cohort Evaluation Roster - Chapter ${chapter.chapterNumber}: ${chapter.title}`]);
  wsRoster.addRow([`Sorted by: ${sorting.sortBy.toUpperCase()} (${sorting.sortOrder.toUpperCase()}) | Enrolled: ${cohort.totalEnrolled} | Passed: ${cohort.passedCount} (${cohort.passRate}%)`]);
  wsRoster.addRow([]);

  const rHeader = wsRoster.addRow([
    'Rank',
    'Student ID',
    'Surname',
    'First Name',
    'Full Name',
    'Attempts Count',
    'Highest Score (/20)',
    'Percentage (%)',
    'Passing Status',
    'Latest Attempt Date'
  ]);
  rHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  rHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  records.forEach(rec => {
    wsRoster.addRow([
      rec.rank,
      sanitizeCellValue(rec.username),
      sanitizeCellValue(rec.surname),
      sanitizeCellValue(rec.firstName),
      sanitizeCellValue(rec.fullName),
      rec.attemptsCount,
      rec.highestScore !== null ? rec.highestScore : 'N/A',
      rec.highestScorePercentage !== null ? `${rec.highestScorePercentage}%` : 'N/A',
      rec.status.toUpperCase(),
      rec.latestAttemptAt ? new Date(rec.latestAttemptAt).toLocaleString() : 'N/A'
    ]);
  });

  wsRoster.columns.forEach(col => { col.width = 18; });
  wsRoster.getColumn(2).width = 20;
  wsRoster.getColumn(3).width = 20;
  wsRoster.getColumn(4).width = 20;
  wsRoster.getColumn(5).width = 25;
  wsRoster.getColumn(10).width = 24;

  return workbook.xlsx.writeBuffer();
};

/**
 * Generate Chapter Summary & Cohort Assessment CSV (Faculty Only)
 */
const generateChapterSummaryCSV = async ({ summaryData }) => {
  const { chapter, course, cohort, records, sorting } = summaryData;

  const lines = [];
  lines.push(`# Course: ${sanitizeCellValue(course.courseCode)} - ${sanitizeCellValue(course.courseTitle)}`);
  lines.push(`# Chapter ${chapter.chapterNumber}: ${sanitizeCellValue(chapter.title)}`);
  lines.push(`# Cohort Pass Rate: ${cohort.passRate}% | Average Score: ${cohort.averageScore}/20`);
  lines.push(`# Sorting: ${sorting.sortBy.toUpperCase()} (${sorting.sortOrder.toUpperCase()})`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push('');

  const headers = [
    'Rank',
    'StudentID',
    'Surname',
    'FirstName',
    'AttemptsCount',
    'HighestScore',
    'ScorePercentage',
    'Status',
    'LatestAttemptDate'
  ];
  lines.push(headers.join(','));

  records.forEach(rec => {
    const row = [
      rec.rank,
      `"${sanitizeCellValue(rec.username)}"`,
      `"${sanitizeCellValue(rec.surname)}"`,
      `"${sanitizeCellValue(rec.firstName)}"`,
      rec.attemptsCount,
      rec.highestScore !== null ? rec.highestScore : '',
      rec.highestScorePercentage !== null ? `${rec.highestScorePercentage}%` : '',
      rec.status.toUpperCase(),
      rec.latestAttemptAt ? `"${new Date(rec.latestAttemptAt).toISOString()}"` : '""'
    ];
    lines.push(row.join(','));
  });

  return Buffer.from(lines.join('\r\n'), 'utf-8');
};

module.exports = {
  sanitizeCellValue,
  generateMasterGradebookXLSX,
  generateMasterGradebookCSV,
  generateTopicGradebookXLSX,
  generateMasterGradebookPDF,
  generateQuizAnswerKeysPDF,
  generateChapterSummaryPDF,
  generateChapterSummaryXLSX,
  generateChapterSummaryCSV
};

