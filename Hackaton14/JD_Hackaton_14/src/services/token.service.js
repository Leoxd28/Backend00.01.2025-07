const { models } = require('../db');
const { signAccess, signRefresh, verifyRefresh, generateJti } = require('../utils/tokens');

async function issueTokens(user) {
  const payload = { sub: user.id || user._id.toString(), role: user.role };
  const jti = generateJti();
  const refresh = signRefresh(payload, jti);
  const access = signAccess(payload);

  const { exp } = verifyRefresh(refresh);
  const expiresAt = new Date(exp * 1000);

  await models.RefreshToken.create({ jti, user: payload.sub, expiresAt, revoked: false });

  return { access, refresh, jti, expiresAt };
}

async function rotateRefresh(oldToken) {
  const decoded = verifyRefresh(oldToken);
  const doc = await models.RefreshToken.findOne({ jti: decoded.jti, user: decoded.sub });
  if (!doc || doc.revoked) throw new Error('Refresh token invalid/revoked');

  doc.revoked = true;
  await doc.save();

  const user = { _id: decoded.sub, role: decoded.role };
  return issueTokens(user);
}

async function revokeRefresh(token) {
  const decoded = verifyRefresh(token);
  await models.RefreshToken.updateOne(
    { jti: decoded.jti, user: decoded.sub },
    { $set: { revoked: true } }
  );
}

module.exports = {
  issueTokens,
  rotateRefresh,
  revokeRefresh
};