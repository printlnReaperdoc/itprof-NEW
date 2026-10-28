const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/analytics.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/dashboard', requireAuth, getDashboardAnalytics);

module.exports = router;

