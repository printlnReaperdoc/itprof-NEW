const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to proceed.',
        code: 'UNAUTHENTICATED'
      });
    }

    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'User session invalid. Please log in again.',
        code: 'USER_NOT_FOUND'
      });
    }

    if (!user.isActive) {
      req.session.destroy();
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact an administrator.',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// Optional auth for public preview or checking active status
const optionalAuth = async (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId).select('-passwordHash');
      if (user && user.isActive) {
        req.user = user;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireAuth,
  optionalAuth
};

