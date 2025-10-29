const { verifyAccess } = require('../utils/tokens');

// Blacklist simple en memoria (reto opcional)
const accessBlacklist = new Set();

function blacklistAccessJti(jti, ttlMs = 15 * 60 * 1000) {
  if (!jti) return;
  accessBlacklist.add(jti);
  setTimeout(() => accessBlacklist.delete(jti), ttlMs);
}

function tryBlacklistFromAuthHeader(req) {
  const auth = req.headers.authorization || '';
  const [, token] = auth.split(' ');
  if (!token) return;
  try {
    const decoded = verifyAccess(token);
    if (decoded.jti) blacklistAccessJti(decoded.jti);
  } catch (_) {
    // ignore
  }
}

function requireAuthJwt(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  try {
    const decoded = verifyAccess(token);
    if (decoded.jti && accessBlacklist.has(decoded.jti)) {
      return res.status(401).json({ error: 'Token blacklisted' });
    }
    req.user = { id: decoded.sub, role: decoded.role, jti: decoded.jti };
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
}

module.exports = { requireAuthJwt, blacklistAccessJti, tryBlacklistFromAuthHeader };