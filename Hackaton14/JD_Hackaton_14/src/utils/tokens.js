const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const env = require('../config/env');

function signAccess(payload) {
  // Incluir jti para poder blacklist
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TTL,
    jwtid: crypto.randomUUID()
  });
}

function signRefresh(payload, jti) {
  return jwt.sign({ ...payload, jti }, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TTL });
}

function verifyAccess(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

function verifyRefresh(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}

function generateJti() {
  return crypto.randomUUID();
}

module.exports = {
  signAccess,
  signRefresh,
  verifyAccess,
  verifyRefresh,
  generateJti
};