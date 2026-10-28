const AuditLog = require('../models/AuditLog');

const sanitizeDetails = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  
  const sensitiveKeys = ['password', 'passwordHash', 'confirmPassword', 'secret', 'token', 'csrfToken'];
  for (const key of Object.keys(clone)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      clone[key] = '[REDACTED]';
    } else if (typeof clone[key] === 'object' && clone[key] !== null) {
      clone[key] = sanitizeDetails(clone[key]);
    }
  }
  return clone;
};

const createAuditLog = async ({
  actorUserId = null,
  action,
  entityType,
  entityId = null,
  details = {},
  req = null,
  session = null
}) => {
  try {
    const ipAddress = req
      ? (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip || '')
      : '';
    const requestId = req?.id || '';

    const sanitizedDetails = sanitizeDetails(details);

    const logEntry = new AuditLog({
      actorUserId: actorUserId || req?.user?._id || null,
      action,
      entityType,
      entityId: entityId ? entityId.toString() : null,
      details: sanitizedDetails,
      ipAddress: typeof ipAddress === 'string' ? ipAddress.split(',')[0].trim() : '',
      requestId
    });

    if (session) {
      await logEntry.save({ session });
    } else {
      await logEntry.save();
    }

    return logEntry;
  } catch (err) {
    console.error('[AuditService] Failed to record audit log:', err.message);
    // If inside a transaction where session is provided, re-throw to guarantee audit durability
    if (session) {
      throw err;
    }
  }
};

module.exports = {
  createAuditLog,
  sanitizeDetails
};

