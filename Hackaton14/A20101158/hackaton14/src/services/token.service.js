import { v4 as uuidv4 } from "uuid";
import { signAccess, signRefresh } from "../utils/tokens.js";

const refreshTokens = new Map(); 

export function generateTokens(user) {
  const jti = uuidv4();
  const accessToken = signAccess({ sub: user.id, role: user.role });
  const refreshToken = signRefresh({ sub: user.id, jti });

  // se guarda en memoria
  refreshTokens.set(jti, { userId: user.id, revoked: false });
  return { accessToken, refreshToken };
}

export function rotateRefreshToken(oldJti, user) {
  if (!refreshTokens.has(oldJti) || refreshTokens.get(oldJti).revoked)
    throw new Error("Token refresh inválido");

  
  refreshTokens.get(oldJti).revoked = true;

  // genera tokens
  return generateTokens(user);
}

export function revokeRefresh(jti) {
  if (refreshTokens.has(jti)) {
    refreshTokens.get(jti).revoked = true;
  }
}
