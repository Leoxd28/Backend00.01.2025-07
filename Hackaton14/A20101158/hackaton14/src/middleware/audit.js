import { logEvent } from "../services/log.service.js";

export function audit(action) {
  return (req, res, next) => {
    const user = req.user || {};
    const ip = req.ip || req.connection.remoteAddress;

    res.on("finish", () => {
      logEvent({
        userId: user.sub || "anon",
        role: user.role || "guest",
        action,
        ip,
        status: res.statusCode,
      });
    });

    next();
  };
}
