const express = require("express");
const router = express.Router();

const users = require("./users");
const orders = require("./orders");
const uploads = require("./uploads");
const payments = require("./payments");
const metrics = require("../metrics");

router.use("/v1/users", users);
router.use("/v1/orders", orders);
router.use("/v1/uploads", uploads);
router.use("/v1/payments", payments);
router.use("/v1/metrics", metrics);

module.exports = router;
