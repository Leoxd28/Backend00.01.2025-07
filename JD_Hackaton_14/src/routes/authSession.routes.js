const express = require('express');
const router = express.Router();
const { verifyCredentials } = require('../services/user.service');
const { requireAuthSession } = require('../middleware/authSession');
const { csrfTokenRoute, requireCsrf } = require('../middleware/csrf');

// GET /session/csrf -> emite token CSRF de la sesión
router.get('/csrf', csrfTokenRoute);

// POST /session/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = await verifyCredentials(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Prevención de fixation
  req.session.regenerate(err => {
    if (err) return res.status(500).json({ error: 'Session error' });
    req.session.user = { id: user._id.toString(), email: user.email, role: user.role };
    res.json({ ok: true, user: { id: user._id.toString(), email: user.email, role: user.role } });
  });
});

// GET /session/me
router.get('/me', requireAuthSession, (req, res) => {
  res.json({ user: req.session.user });
});

// POST /session/logout (requiere CSRF)
router.post('/logout', requireAuthSession, requireCsrf, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

// Ejemplo protegido con CSRF (para pruebas)
router.post('/x-form', requireAuthSession, requireCsrf, (req, res) => {
  res.json({ ok: true, received: req.body || {} });
});

module.exports = router;