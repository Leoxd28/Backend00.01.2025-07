const express = require('express');
const { getAllOrders, createOrder } = require('../../controllers/orders.controller');
const authToken = require('../../middlewares/authToken');
const router = express.Router();

router.get('/', authToken, getAllOrders);
router.post('/', authToken, createOrder);

module.exports = router;
