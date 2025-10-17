const express = require('express');
const router = express.Router();

router.use('/users', require('./users.routes'));
router.use('/swagger', require('./swagger.routes'));

module.exports = router;