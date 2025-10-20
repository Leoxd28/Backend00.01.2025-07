const express = require('express');
const router = express.Router();

router.use('/users', require('./users.routes'));
router.use('/swagger', require('./swagger.routes'));
router.use('/orders', require('./orders.routes'))

module.exports = router;