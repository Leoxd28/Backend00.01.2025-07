const express = require('express');
const router = express.Router();
const { requireAuthJwt } = require('../middleware/authJwt');
const { requireAuthSessionOrJwt } = require('../middleware/authSession');
const { requireRole } = require('../middleware/requireRole');

// GET /private/profile (auth requerida: sesión o JWT)
router.get('/private/profile', requireAuthSessionOrJwt, (req, res) => {
  const actor = req.user || req.session.user;
  res.json({ profile: { id: actor.id, role: actor.role } });
});

// GET /admin/stats (solo admin)
router.get('/admin/stats', requireAuthSessionOrJwt, requireRole('admin'), (req, res) => {
  res.json({
    stats: { users: 2, activeSessions: 'n/a', refreshTokens: 'n/a' },
    checkedAt: new Date().toISOString()
  });
});

module.exports = router;