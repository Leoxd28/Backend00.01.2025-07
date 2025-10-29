const express = require('express');
const router = express.Router();
const { issueTokens, rotateRefresh, revokeRefresh } = require('../services/token.service');
const { requireAuthJwt, tryBlacklistFromAuthHeader } = require('../middleware/authJwt');
const { verifyCredentials } = require('../services/user.service');
const { verifyRefresh } = require('../utils/tokens');

const REFRESH_COOKIE = 'refreshToken';

// POST /jwt/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = await verifyCredentials(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const tokens = await issueTokens(user);
  res.cookie(REFRESH_COOKIE, tokens.refresh, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.json({ access: tokens.access, tokenType: 'Bearer', expiresAt: tokens.expiresAt });
});

// POST /jwt/refresh
router.post('/refresh', async (req, res) => {
  const token = (req.cookies && req.cookies[REFRESH_COOKIE]) || (req.body && req.body.refresh);
  if (!token) return res.status(400).json({ error: 'refresh token missing' });
  try {
    const { access, refresh, expiresAt } = await rotateRefresh(token);
    res.cookie(REFRESH_COOKIE, refresh, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ access, tokenType: 'Bearer', expiresAt });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// POST /jwt/logout
router.post('/logout', async (req, res) => {
  const token = (req.cookies && req.cookies[REFRESH_COOKIE]) || (req.body && req.body.refresh);
  if (token) {
    try {
      // Revoca refresh
      await revokeRefresh(token);
      // Blacklistea access si vino en Authorization
      tryBlacklistFromAuthHeader(req);
    } catch (_) {
      // Ignora errores de verificación
    }
  }
  res.clearCookie(REFRESH_COOKIE);
  res.json({ ok: true });
});

// GET /jwt/me
router.get('/me', requireAuthJwt, (req, res) => {
  res.json({ user: { id: req.user.id, role: req.user.role } });
});

module.exports = router;