require('dotenv').config();

// Auto-detect Render deployment environment and enforce production settings
if (process.env.RENDER === 'true' || process.env.RENDER_SERVICE_ID) {
  process.env.NODE_ENV = 'production';
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');
const createSessionConfig = require('./config/session');
const requestId = require('./middleware/requestId');
const csrfProtection = require('./middleware/csrf');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const chapterRoutes = require('./routes/chapter.routes');
const lessonRoutes = require('./routes/lesson.routes');
const presentationRoutes = require('./routes/presentation.routes');
const quizRoutes = require('./routes/quiz.routes');
const quizAttemptRoutes = require('./routes/quizAttempt.routes');
const gradebookRoutes = require('./routes/gradebook.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const exportRoutes = require('./routes/export.routes');
const auditLogRoutes = require('./routes/auditLog.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (needed for secure cookies behind proxies)
app.set('trust proxy', 1);

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Managed or relaxed for local development / Vite integration
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: false
  })
);

// CORS configuration
// Supports single or comma-separated CLIENT_URL values alongside standard local dev origins and production Vercel frontend
const rawClientUrl = process.env.CLIENT_URL || '';
const configuredOrigins = rawClientUrl
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://itprof-new.vercel.app'
];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, automated tests)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.trim().replace(/\/+$/, '');

      // Exact match against allowed origins (including itprof-new.vercel.app and configured CLIENT_URL)
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // Allow any Vercel deployment of the app (e.g. itprof-new.vercel.app, preview branches)
      if (normalizedOrigin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      // Reject unauthorized origins strictly (no wildcard origins with credentials)
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-CSRF-Token',
      'x-csrf-token',
      'X-XSRF-TOKEN',
      'x-xsrf-token',
      'X-Request-Id'
    ],
    exposedHeaders: ['X-CSRF-Token', 'x-csrf-token', 'X-Request-Id'],
    maxAge: 86400
  })
);

// Body Parsers & Cookie Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request ID tracking
app.use(requestId);

// Normalize duplicated /api prefixes (e.g. from axios baseURL + absolute url)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/api/')) {
    req.url = req.url.replace('/api/api/', '/api/');
  }
  next();
});

// Database Connection
connectDB().catch((err) => {
  console.error('Initial MongoDB connection failed:', err.message);
});

// Session Configuration
app.use(createSessionConfig());

// CSRF Protection
app.use(csrfProtection);

// Static uploads (for authorized file downloads, handled with permission checks in controllers)
app.use('/storage/uploads', express.static(path.join(__dirname, 'storage', 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'IT Professional Electives LMS API',
    requestId: req.id
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/presentations', presentationRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api/gradebook', gradebookRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/exports', exportRoutes);
app.use('/api/audit-logs', auditLogRoutes);

// Centralized error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`[LMS Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n[LMS Server] Received ${signal}. Closing HTTP server...`);
  server.close(async () => {
    console.log('[LMS Server] HTTP server closed.');
    const mongoose = require('mongoose');
    try {
      await mongoose.connection.close(false);
      console.log('[MongoDB] Connection cleanly terminated.');
      process.exit(0);
    } catch (err) {
      console.error('[MongoDB] Error during termination:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;