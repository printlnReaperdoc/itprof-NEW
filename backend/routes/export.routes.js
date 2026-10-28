const express = require('express');
const router = express.Router();
const {
  exportMasterGradebook,
  exportTopicGradebook,
  exportQuizAnswerKeysPDF
} = require('../controllers/export.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Faculty & Admin: Export all Quiz Answer Keys PDF
router.get('/quizzes/answer-keys/pdf', requireAuth, authorize(['faculty', 'admin']), exportQuizAnswerKeysPDF);

// Master & Topic gradebooks
router.get('/master/:courseId', requireAuth, authorize(['faculty', 'admin']), exportMasterGradebook);
router.get('/topic/:chapterId', requireAuth, authorize(['faculty', 'admin']), exportTopicGradebook);

module.exports = router;

