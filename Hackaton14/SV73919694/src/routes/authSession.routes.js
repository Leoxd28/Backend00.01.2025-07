import { Router } from "express";
import { findById, validateCredentials } from "../seeds/user.js";
import { requireAuthSession } from "../middleware/authSession.js";

export const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = await validateCredentials(email, password);
  if (!user) return res.status(401).json({ error: "Invalid Credentials" });

  req.session.regenerate((err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Session Error", message: err.message });
    req.session.user = { id: user.id, email: user.email, role: user.role };
    res.json({ ok: true, user: req.session.user });
  });
});

sessionRouter.post("/logout", requireAuthSession, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.json({ ok: true });
  });
});

sessionRouter.get("/me", requireAuthSession, async (req, res) => {
  const me = await findById(req.user.id);
  res.json({ id: me.id, email: me.email, role: me.role });
});
