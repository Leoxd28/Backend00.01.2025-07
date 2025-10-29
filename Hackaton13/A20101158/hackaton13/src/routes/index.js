const express = require('express');
const router = express.Router();

const usersRoutes = require('./v1/users.routes');
const ordersRoutes = require('./v1/orders.routes');
const uploadRoutes = require('./v1/upload.routes');
const idempotentRoutes = require('./v1/idempotent.routes');
const metricsRoutes = require('./v1/metrics.routes');
const streamRoutes = require('./v1/stream.routes');

router.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

router.use('/v1/users', usersRoutes);
router.use('/v1/orders', ordersRoutes);
router.use('/v1/upload', uploadRoutes);
router.use('/v1/idempotent', idempotentRoutes);
router.use('/v1/metrics', metricsRoutes);
router.use('/v1/stream', streamRoutes);

module.exports = router;


