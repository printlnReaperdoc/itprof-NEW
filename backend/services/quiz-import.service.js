const ExcelJS = require('exceljs');

/**
 * Validates and normalizes question objects
 */
const validateQuestionsArray = (questionsArray, expectedCount = 20) => {
  const errors = [];
  const validQuestions = [];

  if (!Array.isArray(questionsArray)) {
    return { isValid: false, errors: ['Input must be a JSON array of questions'] };
  }

  if (expectedCount && questionsArray.length !== expectedCount) {
    errors.push(`Quiz must contain exactly ${expectedCount} questions. Received: ${questionsArray.length}`);
  }

  const seenPositions = new Set();

  questionsArray.forEach((item, index) => {
    const qNum = index + 1;
    const pos = item.position || qNum;

    if (seenPositions.has(pos)) {
      errors.push(`Question #${qNum}: Duplicate position ${pos}`);
    }
    seenPositions.add(pos);

    if (!item.questionText || typeof item.questionText !== 'string' || item.questionText.trim().length === 0) {
      errors.push(`Question #${qNum}: Missing or empty question text`);
    }

    // Check options
    const options = item.options;
    if (!Array.isArray(options) || options.length < 2) {
      errors.push(`Question #${qNum}: Must have at least 2 options (standard is 4: A, B, C, D)`);
      return;
    }

    let correctCount = 0;
    const normalizedOptions = [];
    const seenLabels = new Set();

    options.forEach((opt, optIndex) => {
      const defaultLabel = String.fromCharCode(65 + optIndex); // A, B, C, D
      const label = (opt.label || opt.optionLabel || defaultLabel).toUpperCase().trim();

      if (seenLabels.has(label)) {
        errors.push(`Question #${qNum}: Duplicate option label "${label}"`);
      }
      seenLabels.add(label);

      const text = (opt.text || opt.optionText || '').trim();
      if (!text) {
        errors.push(`Question #${qNum}: Option ${label} text cannot be empty`);
      }

      const isCorrect = Boolean(opt.isCorrect === true || opt.isCorrect === 'true' || opt.isCorrect === 1);
      if (isCorrect) correctCount += 1;

      normalizedOptions.push({
        optionLabel: label,
        optionText: text,
        isCorrect
      });
    });

    if (correctCount !== 1) {
      errors.push(`Question #${qNum}: Must have exactly 1 correct option. Found: ${correctCount}`);
    }

    validQuestions.push({
      position: pos,
      questionText: item.questionText.trim(),
      points: item.points || 1,
      options: normalizedOptions
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
    questions: validQuestions
  };
};

/**
 * Parse CSV / XLSX file buffer or stream
 */
const parseSpreadsheetQuestions = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  const ext = filePath.split('.').pop().toLowerCase();

  if (ext === 'csv') {
    await workbook.csv.readFile(filePath);
  } else if (ext === 'xlsx') {
    await workbook.xlsx.readFile(filePath);
  } else {
    throw new Error('Unsupported spreadsheet format. Use .csv or .xlsx');
  }

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('Spreadsheet has no worksheets');
  }

  const questionsMap = new Map();

  // Expected headers: Position, Question, OptionA, OptionB, OptionC, OptionD, CorrectOption
  // Or: QuestionNumber, QuestionText, OptionLabel, OptionText, IsCorrect
  let isRowPerOption = false;

  const headerRow = worksheet.getRow(1);
  const headers = [];
  headerRow.eachCell((cell, colNumber) => {
    headers[colNumber] = String(cell.value || '').trim().toLowerCase();
  });

  const headersStr = headers.join(' ');
  if (headersStr.includes('optionlabel') || headersStr.includes('iscorrect')) {
    isRowPerOption = true;
  }

  if (isRowPerOption) {
    // Each row is one option of a question
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const qNum = parseInt(row.getCell(1).value, 10);
      const qText = String(row.getCell(2).value || '').trim();
      const optLabel = String(row.getCell(3).value || '').trim().toUpperCase();
      const optText = String(row.getCell(4).value || '').trim();
      const isCorrectVal = row.getCell(5).value;
      const isCorrect = String(isCorrectVal).toLowerCase() === 'true' || isCorrectVal === 1 || String(isCorrectVal).toLowerCase() === 'yes';

      if (!questionsMap.has(qNum)) {
        questionsMap.set(qNum, {
          position: qNum,
          questionText: qText,
          options: []
        });
      }

      const q = questionsMap.get(qNum);
      if (qText && !q.questionText) q.questionText = qText;
      q.options.push({
        optionLabel: optLabel,
        optionText: optText,
        isCorrect
      });
    });
  } else {
    // Wide format: Row contains Position, Question, OptionA, OptionB, OptionC, OptionD, CorrectOption (e.g. 'A')
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const pos = parseInt(row.getCell(1).value, 10) || (rowNumber - 1);
      const qText = String(row.getCell(2).value || '').trim();
      const optA = String(row.getCell(3).value || '').trim();
      const optB = String(row.getCell(4).value || '').trim();
      const optC = String(row.getCell(5).value || '').trim();
      const optD = String(row.getCell(6).value || '').trim();
      const correctOpt = String(row.getCell(7).value || '').trim().toUpperCase();

      if (!qText) return;

      const options = [
        { optionLabel: 'A', optionText: optA, isCorrect: correctOpt === 'A' },
        { optionLabel: 'B', optionText: optB, isCorrect: correctOpt === 'B' },
        { optionLabel: 'C', optionText: optC, isCorrect: correctOpt === 'C' },
        { optionLabel: 'D', optionText: optD, isCorrect: correctOpt === 'D' }
      ];

      questionsMap.set(pos, {
        position: pos,
        questionText: qText,
        options
      });
    });
  }

  const rawQuestions = Array.from(questionsMap.values());
  return validateQuestionsArray(rawQuestions, 20);
};

module.exports = {
  validateQuestionsArray,
  parseSpreadsheetQuestions
};

