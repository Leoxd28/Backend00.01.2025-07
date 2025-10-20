const express = require('express');
const router = express.Router();

// Importar todas las rutas
const usersRoutes = require('./users.routes');
const ordersRoutes = require('./orders.routes');
const swaggerRoutes = require('./swagger.routes');
const todosRoutes = require('./todos.routes');
const uploadsRoutes = require('./uploads.routes');
const paymentsRoutes = require('./payments.routes');

// Rutas públicas (sin middleware de autenticación)
router.use('/swagger', swaggerRoutes);
router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);

// Rutas con autenticación interna (manejan su propia autenticación)
router.use('/orders', ordersRoutes);

// Rutas de uploads y payments
router.use('/uploads', uploadsRoutes);
router.use('/payments', paymentsRoutes);

module.exports = router;