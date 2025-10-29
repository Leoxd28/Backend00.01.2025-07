import { Router } from "express";
import { env } from "../config/env.js";
import { validateCredentials } from "../seeds/user.js";
import { signAccess, signRefresh } from "../utils/tokens.js";
import jwt from "jsonwebtoken";
export const jwtRouter = Router();
import { persistRefresh, revokeRefresh, isRefreshValid } from '../services/token.service.js';

function setRefreshCookie(res, refresh) {
  res.cookie("refresh", refresh, {
    httpOnly: true,
    samesite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/jwt",
  });
}

jwtRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = await validateCredentials(email, password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const access = signAccess({
    id: user.id,
    role: user.role,
    email: user.email,
  });
  const refresh = signRefresh({ id: user.id, role: user.role });

  const decoded = jwt.decode(refresh);
  persistRefresh({
    jti: decoded.jti,
    userId: user.id,
    expiresAt: decoded.exp * 1000,
  });

  setRefreshCookie(res, refresh);
  res.json({ access });
});

jwtRouter.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh;
  if (!token) return res.sendStatus(401);
  try {
    const payload = verifyRefresh(token);
    if (!isRefreshValid(payload.jti)) return res.sendStatus(401);

    // Rotar: revocar actual y emitir nuevo
    revokeRefresh(payload.jti);
    const access = signAccess({ id: payload.id, role: payload.role });
    const nextRefresh = signRefresh({ id: payload.id, role: payload.role });
    const decoded = jwt.decode(refresh);
    persistRefresh({
      jti: decoded.jti,
      userId: user.id,
      expiresAt: decoded.exp * 1000,
    });

    setRefreshCookie(res, nextRefresh);
    res.json({ access });
  } catch {
    return res.sendStatus(401);
  }
});

jwtRouter.post("/logout", (req, res) => {
  const token = req.cookies?.refresh;
  if (token) {
    try {
      const payload = verifyRefresh(token);
      revokeRefresh(payload.jti);
    } catch {}
  }
  res.clearCookie("refresh", { path: "/jwt" });
  res.json({ ok: true });
});
