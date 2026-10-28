const crypto = require('crypto');

// Generate CSRF token and set cookie
const csrfProtection = (req, res, next) => {
  if (req.session) {
    if (!req.session.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }

    // Set XSRF-TOKEN cookie readable by client
    res.cookie('XSRF-TOKEN', req.session.csrfToken, {
      httpOnly: false, // Must be readable by Axios/Fetch
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  // Safe HTTP methods do not require CSRF token validation
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  // Exempt auth login/register from CSRF if user does not have a session yet
  const exemptPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/csrf-token'
  ];
  if (exemptPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  // Validate CSRF token from header or body
  const clientToken = req.headers['x-csrf-token'] || 
                      req.headers['x-xsrf-token'] || 
                      (req.body && req.body._csrf);

  if (!req.session || !req.session.csrfToken || !clientToken || clientToken !== req.session.csrfToken) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or missing CSRF token. Please refresh the page and try again.',
      code: 'EBADCSRFTOKEN'
    });
  }

  next();
};

module.exports = csrfProtection;

