import express from "express";
import { requireAuthJwt } from "../middleware/authJwt.js";
import { authorize } from "../middleware/authorize.js";
import { getAllLogs, clearLogs } from "../services/log.service.js";

const router = express.Router();

router.get("/", requireAuthJwt, authorize("admin"), (req, res) => {
  res.json({ logs: getAllLogs() });
});

router.delete("/", requireAuthJwt, authorize("admin"), (req, res) => {
  clearLogs();
  res.json({ message: "Logs borrados" });
});

export default router;
