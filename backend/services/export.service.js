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

module.exports = {
  sanitizeCellValue,
  generateMasterGradebookXLSX,
  generateMasterGradebookCSV,
  generateTopicGradebookXLSX,
  generateMasterGradebookPDF,
  generateQuizAnswerKeysPDF
};

