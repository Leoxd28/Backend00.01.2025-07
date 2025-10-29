import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { nanoid } from "nanoid";

export function signAccess(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TTL,
  });
}

export function signRefresh(payload, jti = nanoid()) {
  return jwt.sign({ ...payload, jti }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TTL,
  });
}

export function verifyAccess(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

export function verifyRefresh(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
