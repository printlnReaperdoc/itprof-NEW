const express = require('express');
const router = express.Router();
const {
  getTopicGradebook,
  getMasterGradebook,
  getStudentGradebook
} = require('../controllers/gradebook.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/topic/:chapterId', requireAuth, authorize(['faculty', 'admin']), getTopicGradebook);
router.get('/master/:courseId', requireAuth, authorize(['faculty', 'admin']), getMasterGradebook);
router.get('/student', requireAuth, getStudentGradebook);

module.exports = router;

