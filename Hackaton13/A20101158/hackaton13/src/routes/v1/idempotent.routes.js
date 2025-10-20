const express = require('express');
const router = express.Router();
const { processPayment } = require('../../controllers/idempotent.controller');
const idempotency = require('../../middlewares/idempotency');
const authToken = require('../../middlewares/authToken');

router.post('/', authToken, idempotency, processPayment);

module.exports = router;
