import express from "express";
import { findUserByEmail, verifyPassword } from "../services/user.service.js";
import { requireAuthSession } from "../middleware/authSession.js";

const router = express.Router();

// inicio de sesion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: "Error al crear sesión" });

    req.session.user = { id: user.id, email: user.email, role: user.role };
    res.json({ message: "Login exitoso", user: req.session.user });
  });
});

// salida de sesion
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Error al cerrar sesión" });
    res.clearCookie("sid");
    res.json({ message: "Sesión cerrada correctamente" });
  });
});

router.get("/me", requireAuthSession, (req, res) => {
  res.json({ user: req.session.user });
});

export default router;
