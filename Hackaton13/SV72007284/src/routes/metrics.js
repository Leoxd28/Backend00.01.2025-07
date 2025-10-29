const express = require("express");
const router = express.Router();
const { metrics } = require("../middlewares/metricsMiddleware");

router.get("/", (req, res) => {
  res.json(metrics);
});

module.exports = router;
