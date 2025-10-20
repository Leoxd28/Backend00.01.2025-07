const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const ordersRoutes = require('./orders.routes');
const swaggerRoutes = require('./swagger.routes');
const todosRoutes = require('./todos.routes');

// Rutas públicas (sin protección)
router.use('/swagger', swaggerRoutes);

// Rutas de ejemplo
router.use('/todos', todosRoutes);

// Rutas que no requieren autenticación para users
router.use('/users', usersRoutes);

// Rutas de orders (la autenticación se maneja dentro del archivo orders.routes.js)
router.use('/orders', ordersRoutes);

module.exports = router;