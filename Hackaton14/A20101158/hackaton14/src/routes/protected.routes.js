import express from "express";
import { requireAuthJwt } from "../middleware/authJwt.js";
import { authorize } from "../middleware/authorize.js";
import { audit } from "../middleware/audit.js";

const router = express.Router();


router.get("/public", (req, res) => {
  res.json({ message: "Ruta pública — acceso libre" });
});



/*router.get("/private", requireAuthJwt, (req, res) => {
  res.json({ message: "Ruta privada — usuario autenticado", user: req.user });
});


router.get("/admin", requireAuthJwt, authorize("admin"), (req, res) => {
  res.json({
    message: "Ruta solo para administradores",
    user: req.user,
  });
});*/

router.get("/private", requireAuthJwt, audit("Acceso a ruta privada"), (req, res) => {
  res.json({ message: "Ruta privada — usuario autenticado", user: req.user });
});
router.get("/admin",
  requireAuthJwt,
  authorize("admin"),
  audit("Acceso al panel admin"),
  (req, res) => {
    res.json({ message: "Ruta solo para administradores", user: req.user });
  }
);

router.get(
  "/dashboard",
  requireAuthJwt,
  authorize("admin", "user"),
  (req, res) => {
    res.json({ message: `Dashboard para ${req.user.role}`, user: req.user });
  }
);

export default router;
