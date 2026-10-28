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

module.exports = {
  sanitizeCellValue,
  generateMasterGradebookXLSX,
  generateMasterGradebookCSV,
  generateTopicGradebookXLSX,
  generateMasterGradebookPDF
};

