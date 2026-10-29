const express = require('express');
const router = express.Router();
const {
  exportMasterGradebook,
  exportTopicGradebook,
  exportQuizAnswerKeysPDF,
  exportChapterSummaryPDF,
  exportChapterSummaryXLSX,
  exportChapterSummaryCSV
} = require('../controllers/export.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Faculty, Admin & Student: Export all Quiz Answer Keys PDF
router.get('/quizzes/answer-keys/pdf', requireAuth, exportQuizAnswerKeysPDF);

// Master & Topic gradebooks
router.get('/master/:courseId', requireAuth, authorize(['faculty', 'admin']), exportMasterGradebook);
router.get('/topic/:chapterId', requireAuth, authorize(['faculty', 'admin']), exportTopicGradebook);

// Faculty-only Chapter Comprehensive Summary & Document Dossier Exports (PDF, XLSX, CSV)
router.get('/chapter/:chapterId/summary/pdf', requireAuth, authorize(['faculty', 'admin']), exportChapterSummaryPDF);
router.get('/chapter/:chapterId/summary/xlsx', requireAuth, authorize(['faculty', 'admin']), exportChapterSummaryXLSX);
router.get('/chapter/:chapterId/summary/csv', requireAuth, authorize(['faculty', 'admin']), exportChapterSummaryCSV);

module.exports = router;

