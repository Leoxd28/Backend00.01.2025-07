const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { dtoCreateOrder, validateToken } = require('../../middlewares/validates'); // Corregido: validates en lugar de validaciones

// Crear directorio uploads si no existe
const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de multer para avatars
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `avatar-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { 
        fileSize: 2 * 1024 * 1024, // 2MB
        files: 1 
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten imágenes'));
        }
        cb(null, true);
    }
});

// Base de datos simulada
const orders = [
    { id: 1, items: ['producto1', 'producto2'], customerId: 123, status: 'completed', createdAt: '2025-01-01T00:00:00Z' },
    { id: 2, items: ['producto3'], customerId: 456, status: 'pending', createdAt: '2025-01-02T00:00:00Z' },
    { id: 3, items: ['producto4', 'producto5'], customerId: 789, status: 'cancelled', createdAt: '2025-01-03T00:00:00Z' }
];

// Cache para idempotencia de pagos
const processedPayments = new Map();

// Middleware de autenticación para rutas protegidas de orders
router.use(['/', '/export'], validateToken);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Lista órdenes con paginación y filtros
 *     tags: [Orders]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [id, customerId, -id, -customerId]
 *     responses:
 *       200:
 *         description: Lista paginada de órdenes
 */
router.get('/', (req, res) => {
    const { page = 1, limit = 10, status, sort = 'id' } = req.query;
    
    let filteredOrders = [...orders];
    
    // Filtrar por status
    if (status) {
        filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    
    // Ordenar
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortDirection = sort.startsWith('-') ? -1 : 1;
    
    filteredOrders.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1 * sortDirection;
        if (a[sortField] > b[sortField]) return 1 * sortDirection;
        return 0;
    });
    
    // Paginar
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    res.json({
        orders: paginatedOrders,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredOrders.length,
            totalPages: Math.ceil(filteredOrders.length / limit)
        },
        filters: { status, sort }
    });
});

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Crear nueva orden
 *     tags: [Orders]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - customerId
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *               customerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */
router.post('/', dtoCreateOrder, (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({
        message: 'Orden creada exitosamente',
        order: newOrder
    });
});

/**
 * @swagger
 * /api/v1/orders/export:
 *   get:
 *     summary: Exportar órdenes en formato CSV
 *     tags: [Orders]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: CSV con las órdenes
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */
router.get('/export', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    
    // Cabeceras CSV
    res.write('ID,Customer ID,Items,Status,Created At\n');
    
    // Datos
    orders.forEach(order => {
        const row = [
            order.id,
            order.customerId,
            `"${order.items.join(', ')}"`,
            order.status,
            order.createdAt || new Date().toISOString()
        ].join(',');
        res.write(row + '\n');
    });
    
    res.end();
});

// Rutas para uploads y payments que van en este archivo según los requerimientos

/**
 * @swagger
 * /api/v1/uploads/avatar:
 *   post:
 *     summary: Subir avatar de usuario
 *     tags: [Uploads]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del avatar (máx. 2MB)
 *     responses:
 *       201:
 *         description: Avatar subido exitosamente
 *       400:
 *         description: Error en la validación del archivo
 */
router.post('/uploads/avatar', validateToken, upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'No se recibió ningún archivo'
        });
    }
    
    res.status(201).json({
        message: 'Avatar subido exitosamente',
        file: {
            originalName: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: `/uploads/${req.file.filename}`
        }
    });
});

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Procesar pago (idempotente)
 *     tags: [Payments]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: header
 *         name: Idempotency-Key
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave única para garantizar idempotencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - customerId
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *               currency:
 *                 type: string
 *                 default: USD
 *               customerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pago procesado exitosamente
 *       200:
 *         description: Pago ya procesado (idempotencia)
 *       400:
 *         description: Falta header Idempotency-Key
 */
router.post('/payments', validateToken, (req, res) => {
    const idempotencyKey = req.get('Idempotency-Key');
    
    if (!idempotencyKey) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Header Idempotency-Key es requerido'
        });
    }
    
    // Verificar si ya fue procesado (idempotencia)
    if (processedPayments.has(idempotencyKey)) {
        const existingPayment = processedPayments.get(idempotencyKey);
        return res.status(200).json({
            ...existingPayment,
            idempotent: true,
            message: 'Pago ya procesado anteriormente'
        });
    }
    
    // Validar datos del pago
    const { amount, currency = 'USD', customerId } = req.body;
    
    if (!amount || amount <= 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El monto debe ser mayor a 0'
        });
    }
    
    if (!customerId) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'customerId es requerido'
        });
    }
    
    // Procesar nuevo pago
    const payment = {
        id: `pay_${Date.now()}`,
        amount: parseFloat(amount),
        currency,
        customerId: parseInt(customerId),
        status: 'completed',
        processedAt: new Date().toISOString(),
        idempotencyKey
    };
    
    // Guardar en cache de idempotencia
    processedPayments.set(idempotencyKey, payment);
    
    res.status(201).json({
        ...payment,
        message: 'Pago procesado exitosamente'
    });
});

module.exports = router;