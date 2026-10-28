const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { initializeStudentCourseProgress } = require('../services/progress.service');
const { createAuditLog } = require('../services/audit.service');

/**
 * Register a new student
 * NOTE: Public registration MUST create Student accounts only.
 */
const register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, firstName, surname } = req.body;

    if (!username || !password || !confirmPassword || !firstName || !surname) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (username, password, confirmPassword, firstName, surname).'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Check username uniqueness
    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = await User.findOne({ username: normalizedUsername });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username is already taken. Please choose another.'
      });
    }

    const passwordHash = await User.hashPassword(password);

    // Enforce role: 'student' strictly
    const user = new User({
      username: normalizedUsername,
      passwordHash,
      firstName: firstName.trim(),
      surname: surname.trim(),
      role: 'student',
      isActive: true
    });

    await user.save();

    // Auto-enroll student into both curriculum courses (ITEP411-T and ITEP413-T)
    const courses = await Course.find({ isActive: true });
    for (const course of courses) {
      await Enrollment.findOneAndUpdate(
        { courseId: course._id, studentId: user._id },
        { status: 'active', enrolledAt: new Date() },
        { upsert: true, new: true }
      );
      // Initialize progress (Chapter 1 unlocked, others locked)
      await initializeStudentCourseProgress(user._id, course._id);
    }

    // Establish session
    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.userId = user._id;
      req.session.userRole = user.role;

      createAuditLog({
        actorUserId: user._id,
        action: 'USER_REGISTERED',
        entityType: 'User',
        entityId: user._id,
        details: { username: user.username, role: user.role },
        req
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful. Welcome to IT Professional Electives LMS!',
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          surname: user.surname,
          role: user.role
        }
      });
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user with session regeneration
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    const normalizedUsername = username.trim().toLowerCase();
    const user = await User.findOne({ username: normalizedUsername });

    if (!user) {
      await createAuditLog({
        actorUserId: null,
        action: 'LOGIN_FAILED',
        entityType: 'User',
        details: { usernameAttempted: normalizedUsername, reason: 'User not found' },
        req
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact an administrator.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await createAuditLog({
        actorUserId: user._id,
        action: 'LOGIN_FAILED',
        entityType: 'User',
        entityId: user._id,
        details: { username: user.username, reason: 'Invalid password' },
        req
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Regenerate session ID to prevent session fixation attacks
    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.userId = user._id;
      req.session.userRole = user.role;

      createAuditLog({
        actorUserId: user._id,
        action: 'LOGIN_SUCCESS',
        entityType: 'User',
        entityId: user._id,
        details: { username: user.username, role: user.role },
        req
      });

      return res.json({
        success: true,
        message: `Welcome back, ${user.firstName}!`,
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          surname: user.surname,
          role: user.role
        }
      });
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Logout
 */
const logout = async (req, res, next) => {
  try {
    const userId = req.session?.userId;
    if (userId) {
      await createAuditLog({
        actorUserId: userId,
        action: 'LOGOUT',
        entityType: 'User',
        entityId: userId,
        req
      });
    }

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('itprof.sid');
      return res.json({
        success: true,
        message: 'Successfully logged out.'
      });
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get current session user
 */
const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user || !user.isActive) {
      req.session.destroy();
      return res.json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    return res.json({
      success: true,
      authenticated: true,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        surname: user.surname,
        role: user.role
      },
      csrfToken: req.session.csrfToken
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get CSRF token endpoint
 */
const getCsrfToken = (req, res) => {
  return res.json({
    success: true,
    csrfToken: req.session?.csrfToken || ''
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getCsrfToken
};

