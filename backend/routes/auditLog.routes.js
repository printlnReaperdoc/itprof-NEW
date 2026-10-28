const express = require('express');
const router = express.Router();
const { getAuditLogs } = require('../controllers/auditLog.controller');
const { requireAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', requireAuth, authorize(['faculty', 'admin']), getAuditLogs);

module.exports = router;

