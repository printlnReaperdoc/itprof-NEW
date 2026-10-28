const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser, getCsrfToken } = require('../controllers/auth.controller');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/session', getCurrentUser);
router.get('/csrf-token', getCsrfToken);

module.exports = router;

