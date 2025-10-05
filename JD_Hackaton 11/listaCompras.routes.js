const express = require('express');
const router = express.Router();
const controller = require('./controllers/listaComprasController');

// Middleware para logging de rutas
router.use((req, res, next) => {
    console.log(`📍 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Rutas principales
router.get('/', controller.obtenerTodos);
router.post('/', controller.crear);
router.get('/pendientes', controller.obtenerPendientes);
router.get('/completados', controller.obtenerCompletados);
router.get('/estadisticas', controller.obtenerEstadisticas);

// Rutas con parámetros
router.patch('/:id/completar', controller.completar);
router.patch('/:id/descompletar', controller.descompletar);
router.delete('/:id', controller.eliminar);

// Middleware de manejo de errores específico para estas rutas
router.use((error, req, res, next) => {
    console.error(`❌ Error en ruta ${req.method} ${req.path}:`, error);
    
    res.status(500).json({
        success: false,
        message: 'Error interno en la ruta de lista de compras',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
});

module.exports = router;