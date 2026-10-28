const express = require('express');
const router = express.Router();
const { exportMasterGradebook, exportTopicGradebook } = require('../controllers/export.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/master/:courseId', requireAuth, authorize(['faculty', 'admin']), exportMasterGradebook);
router.get('/topic/:chapterId', requireAuth, authorize(['faculty', 'admin']), exportTopicGradebook);

module.exports = router;

