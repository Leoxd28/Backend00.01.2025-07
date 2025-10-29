const crypto = require('node:crypto');
const env = require('../config/env');

function createCsrfToken(req) {
  const sid = req.sessionID || 'no-session';
  return crypto.createHmac('sha256', env.CSRF_SECRET).update(sid).digest('hex');
}

function csrfTokenRoute(req, res) {
  if (!req.session) return res.status(400).json({ error: 'No session' });
  // Asegura que la sesión se materialice
  req.session.__csrfInit = true;

  const token = createCsrfToken(req);
  res.cookie('x-csrf-token', token, {
    httpOnly: false,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 15
  });
  res.json({ csrfToken: token });
}

function requireCsrf(req, res, next) {
  const sent =
    req.headers['x-csrf-token'] ||
    (req.body && req.body._csrf) ||
    (req.cookies && req.cookies['x-csrf-token']);
  const expected = createCsrfToken(req);
  if (!sent || sent !== expected) return res.status(403).json({ error: 'Invalid CSRF token' });
  next();
}

module.exports = { csrfTokenRoute, requireCsrf };