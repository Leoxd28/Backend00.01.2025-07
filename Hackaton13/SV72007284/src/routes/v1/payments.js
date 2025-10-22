const express = require("express");
const router = express.Router();
const idempotency = require("../../middlewares/idempotency");

router.post("/", idempotency, async (req, res) => {
  const { amount, customerId } = req.body || {};
  if (!amount || !customerId)
    return res.status(400).json({ error: "amount and customerId required" });
  await new Promise((r) => setTimeout(r, 150));
  const payment = {
    id: String(Date.now()),
    amount,
    customerId,
    status: "completed",
    createdAt: new Date().toISOString(),
  };
  res.status(201).json(payment);
});

module.exports = router;
