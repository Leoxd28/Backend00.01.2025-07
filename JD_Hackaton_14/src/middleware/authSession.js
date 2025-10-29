function requireAuthSession(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Not authenticated (session)' });
  }
  return next();
}

function requireAuthSessionOrJwt(req, res, next) {
  if (req.session?.user || req.user) return next();
  return res.status(401).json({ error: 'Auth required' });
}

module.exports = { requireAuthSession, requireAuthSessionOrJwt };