const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ status: "ok" }));
router.post("/data", (req, res) =>
  res.json({ received: true, data: req.body || null })
);

module.exports = router;
