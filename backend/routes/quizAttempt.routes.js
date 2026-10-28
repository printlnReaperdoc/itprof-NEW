const express = require('express');
const router = express.Router();
const {
  startAttempt,
  saveAnswer,
  submitAttempt,
  getAttemptReview
} = require('../controllers/quizAttempt.controller');
const { requireAuth } = require('../middleware/auth');

router.post('/chapter/:chapterId/start', requireAuth, startAttempt);
router.put('/:attemptId/answers', requireAuth, saveAnswer);
router.post('/:attemptId/submit', requireAuth, submitAttempt);
router.get('/:attemptId/review', requireAuth, getAttemptReview);

module.exports = router;

