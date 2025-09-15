const express = require('express');
const router = express.Router();
const { combinedStatistics } = require("../controllers/dashboard.controller.js");

const authenticateToken = require("../middlewares/auth.middleware.js");
const checkRole = require("../middlewares/permissions.middleware.js");

router.get("/", authenticateToken, checkRole(["teacher"]), combinedStatistics);

module.exports = router;