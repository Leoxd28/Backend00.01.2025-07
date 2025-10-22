const express = require("express");
const router = express.Router();

let users = [
  { id: "1", name: "Ana", email: "ana@example.com" },
  { id: "2", name: "Luis", email: "luis@example.com" },
];

router.get("/", (req, res) => res.json({ data: users }));

router.post("/", (req, res) => {
  const { name, email } = req.body || {};
  const errors = [];
  if (!name || typeof name !== "string") errors.push("name is required");
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email))
    errors.push("valid email is required");
  if (errors.length) return res.status(400).json({ errors });
  const user = { id: String(Date.now()), name, email };
  users.push(user);
  res.status(201).json(user);
});

router.get("/:id", (req, res) => {
  const u = users.find((x) => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  res.json(u);
});

module.exports = router;
