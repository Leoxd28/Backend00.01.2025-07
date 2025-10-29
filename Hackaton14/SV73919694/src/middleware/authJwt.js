import { verifyAccess } from "../utils/tokens.js";

export function requireAuthJwt(req, res, next) {
  const auth = req.header("Authorization") ?? "";

  if (!auth) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = verifyAccess(token);

    req.user = { id: payload.id, role: payload.role, email: payload.email };

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
