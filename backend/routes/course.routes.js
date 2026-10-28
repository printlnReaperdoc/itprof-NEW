const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseDetails } = require('../controllers/course.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, getAllCourses);
router.get('/:courseId', requireAuth, getCourseDetails);

module.exports = router;

