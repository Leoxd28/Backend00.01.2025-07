const express = require('express');
const router = express.Router();
const listaComprasController = require('./controllers/listaComprasController');

// Middleware de logging específico para estas rutas
router.use((req, res, next) => {
    console.log(`📍 [ROUTES] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📦 [ROUTES] Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// ===== RUTAS PRINCIPALES =====

// GET /api/lista-compras - Obtener todos los items
router.get('/', async (req, res) => {
    console.log('📋 [ROUTES] GET / - Obteniendo todos los items');
    try {
        await listaComprasController.obtenerTodos(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en GET /:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener items',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// POST /api/lista-compras - Crear nuevo item
router.post('/', async (req, res) => {
    console.log('📝 [ROUTES] POST / - Creando nuevo item');
    try {
        await listaComprasController.crear(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en POST /:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al crear item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// GET /api/lista-compras/pendientes - Obtener items pendientes
router.get('/pendientes', async (req, res) => {
    console.log('⏳ [ROUTES] GET /pendientes - Obteniendo items pendientes');
    try {
        await listaComprasController.obtenerPendientes(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en GET /pendientes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener items pendientes',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// GET /api/lista-compras/completados - Obtener items completados
router.get('/completados', async (req, res) => {
    console.log('✅ [ROUTES] GET /completados - Obteniendo items completados');
    try {
        await listaComprasController.obtenerCompletados(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en GET /completados:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener items completados',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// GET /api/lista-compras/estadisticas - Obtener estadísticas
router.get('/estadisticas', async (req, res) => {
    console.log('📊 [ROUTES] GET /estadisticas - Obteniendo estadísticas');
    try {
        await listaComprasController.obtenerEstadisticas(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en GET /estadisticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener estadísticas',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// ===== RUTAS CON PARÁMETROS =====

// PATCH /api/lista-compras/:id/completar - Completar item
router.patch('/:id/completar', async (req, res) => {
    console.log('✅ [ROUTES] PATCH /:id/completar - Completando item:', req.params.id);
    try {
        await listaComprasController.completar(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en PATCH /:id/completar:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al completar item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// PATCH /api/lista-compras/:id/descompletar - Descompletar item
router.patch('/:id/descompletar', async (req, res) => {
    console.log('↩️ [ROUTES] PATCH /:id/descompletar - Descompletando item:', req.params.id);
    try {
        await listaComprasController.descompletar(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en PATCH /:id/descompletar:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al descompletar item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// DELETE /api/lista-compras/:id - Eliminar item
router.delete('/:id', async (req, res) => {
    console.log('🗑️ [ROUTES] DELETE /:id - Eliminando item:', req.params.id);
    try {
        await listaComprasController.eliminar(req, res);
    } catch (error) {
        console.error('❌ [ROUTES] Error en DELETE /:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al eliminar item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// GET /api/lista-compras/:id - Obtener item específico (opcional)
router.get('/:id', async (req, res) => {
    console.log('📄 [ROUTES] GET /:id - Obteniendo item:', req.params.id);
    try {
        const { ObjectId } = require('mongodb');
        const { getDatabase } = require('./db');
        
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido'
            });
        }
        
        const db = getDatabase();
        if (!db) {
            return res.status(500).json({
                success: false,
                message: 'Base de datos no disponible'
            });
        }
        
        const item = await db.collection('listaCompras').findOne({
            _id: new ObjectId(req.params.id)
        });
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Item obtenido exitosamente',
            data: item
        });
        
    } catch (error) {
        console.error('❌ [ROUTES] Error en GET /:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
});

// Middleware de manejo de errores para estas rutas específicas
router.use((error, req, res, next) => {
    console.error(`❌ [ROUTES] Error en ${req.method} ${req.originalUrl}:`, error);
    
    if (!res.headersSent) {
        res.status(500).json({
            success: false,
            message: 'Error interno en las rutas de lista de compras',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno',
            path: req.originalUrl,
            method: req.method
        });
    }
});

// Middleware para métodos no permitidos
router.use('*', (req, res) => {
    console.warn(`⚠️ [ROUTES] Método no permitido: ${req.method} ${req.originalUrl}`);
    res.status(405).json({
        success: false,
        message: `Método ${req.method} no permitido para esta ruta`,
        allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
        path: req.originalUrl
    });
});

module.exports = router;