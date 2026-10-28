const express = require('express');
const router = express.Router();
const { getPresentationByChapter, updatePresentation } = require('../controllers/presentation.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/chapter/:chapterId', requireAuth, getPresentationByChapter);
router.put('/chapter/:chapterId', requireAuth, authorize(['faculty', 'admin']), updatePresentation);

module.exports = router;

