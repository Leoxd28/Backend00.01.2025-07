const express = require("express");
const router = express.Router();
const { stringify } = require("csv-stringify/sync");

router.use((req, res, next) => {
  if (req.headers["x-token"] !== "secret")
    return res.status(401).json({ error: "Unauthorized" });
  next();
});

let orders = [
  { id: "1", customerId: "1", items: [{ product: "A", qty: 2 }], total: 20 },
  { id: "2", customerId: "2", items: [{ product: "B", qty: 1 }], total: 10 },
];

router.get("/", (req, res) => {
  const page = parseInt(req.query.page || "1");
  const pageSize = parseInt(req.query.pageSize || "10");
  let result = orders.slice();
  if (req.query.filter)
    result = result.filter((o) => JSON.stringify(o).includes(req.query.filter));
  if (req.query.sort === "total_desc") result.sort((a, b) => b.total - a.total);
  const start = (page - 1) * pageSize;
  res.json({
    data: result.slice(start, start + pageSize),
    total: result.length,
  });
});

router.post("/", (req, res) => {
  const { items, customerId } = req.body || {};
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "items required" });
  if (!customerId)
    return res.status(400).json({ error: "customerId required" });
  const order = {
    id: String(Date.now()),
    items,
    customerId,
    total: items.length * 10,
  };
  orders.push(order);
  res.status(201).json(order);
});

router.get("/export", (req, res) => {
  const records = orders.map((o) => ({
    id: o.id,
    customerId: o.customerId,
    total: o.total,
  }));
  const csv = stringify(records, { header: true });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="orders.csv"');
  res.send(csv);
});

module.exports = router;
