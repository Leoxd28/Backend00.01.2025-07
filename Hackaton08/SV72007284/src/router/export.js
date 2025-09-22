const express = require("express");
const router = express.Router();
const { exportData } = require("../controllers/export.controller.js");

const authenticateToken = require("../middlewares/auth.middleware.js");
const checkRole = require("../middlewares/permissions.middleware.js");

router.get("/", authenticateToken, checkRole(["teacher", "student"]), exportData);

module.exports = router;