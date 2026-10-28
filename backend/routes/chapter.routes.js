const express = require('express');
const router = express.Router();
const { getChapter, overrideChapterProgress } = require('../controllers/chapter.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/:chapterId', requireAuth, getChapter);
router.post('/:chapterId/override-progress', requireAuth, authorize(['faculty', 'admin']), overrideChapterProgress);

module.exports = router;

