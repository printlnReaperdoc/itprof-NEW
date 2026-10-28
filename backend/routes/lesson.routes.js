const express = require('express');
const router = express.Router();
const { getLessonByChapter, updateLesson, uploadLessonFile, deleteLessonFile } = require('../controllers/lesson.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

router.get('/chapter/:chapterId', requireAuth, getLessonByChapter);
router.put('/chapter/:chapterId', requireAuth, authorize(['faculty', 'admin']), updateLesson);
router.post('/chapter/:chapterId/files', requireAuth, authorize(['faculty', 'admin']), upload.single('file'), uploadLessonFile);
router.delete('/files/:fileId', requireAuth, authorize(['faculty', 'admin']), deleteLessonFile);

module.exports = router;

