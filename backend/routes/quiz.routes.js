const express = require('express');
const router = express.Router();
const { getQuizByChapter, importQuizQuestions, getAllQuizAnswerKeys } = require('../controllers/quiz.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// All authenticated users: Access all quiz answer keys
router.get('/answer-keys', requireAuth, getAllQuizAnswerKeys);

// Chapter quiz endpoints
router.get('/chapter/:chapterId', requireAuth, getQuizByChapter);
router.post('/chapter/:chapterId/import', requireAuth, authorize(['faculty', 'admin']), upload.single('file'), importQuizQuestions);

module.exports = router;

