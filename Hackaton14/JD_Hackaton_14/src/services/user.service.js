const { models } = require('../db');
const { hashPassword, verifyPassword } = require('../utils/passwords');

async function findByEmail(email) {
  return models.User.findOne({ email: email.toLowerCase().trim() });
}

async function createUser({ email, password, role = 'user' }) {
  const passwordHash = await hashPassword(password);
  const user = await models.User.create({ email: email.toLowerCase().trim(), passwordHash, role });
  return user;
}

async function verifyCredentials(email, password) {
  const user = await findByEmail(email);
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

module.exports = { findByEmail, createUser, verifyCredentials };