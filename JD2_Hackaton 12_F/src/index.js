const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rutas
const rawMaterialRoutes = require('./router/rawmaterial');
const inputRoutes = require('./router/input');
const staffRoutes = require('./router/staff');
const productionRoutes = require('./router/production');
const indexRoutes = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🏭 Iniciando Sistema de Producción de Armarios ABC...');

// Middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5501'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`📊 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Conectar a MongoDB
async function connectToDatabase() {
    try {
        const mongoUri = process.env.MONGO_URI;
        const dbName = process.env.DB_NAME || 'SV43123322_Hackaton12';
        
        if (!mongoUri) {
            throw new Error('MONGO_URI no está definida en las variables de entorno');
        }
        
        console.log('🔗 Conectando a MongoDB Atlas...');
        console.log(`🗃️ Base de datos: ${dbName}`);
        
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Conexión exitosa a MongoDB Atlas');
        
        // Verificar conexión
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log(`📚 Colecciones disponibles: ${collections.length}`);
        
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1);
    }
}

// Rutas principales
app.use('/api', indexRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);
app.use('/api/inputs', inputRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/production', productionRoutes);

// Ruta de salud
app.get('/health', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: states[dbState],
            port: PORT,
            environment: process.env.NODE_ENV,
            message: 'Sistema de Producción de Armarios ABC funcionando'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: '🏭 Sistema de Producción de Armarios ABC',
        version: '1.0.0',
        endpoints: {
            rawMaterials: '/api/raw-materials',
            inputs: '/api/inputs',
            staff: '/api/staff',
            production: '/api/production',
            health: '/health'
        },
        documentation: 'Usar Postman Collection para pruebas'
    });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    
    const status = error.status || error.statusCode || 500;
    const message = error.message || 'Error interno del servidor';
    
    res.status(status).json({
        success: false,
        error: {
            message,
            status,
            timestamp: new Date().toISOString(),
            path: req.path
        }
    });
});

// Ruta 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        path: req.originalUrl,
        availableEndpoints: [
            'GET /api/raw-materials',
            'GET /api/inputs',
            'GET /api/staff',
            'GET /api/production',
            'POST /api/production/produce'
        ]
    });
});

// Iniciar servidor
async function startServer() {
    try {
        await connectToDatabase();
        
        app.listen(PORT, () => {
            console.log('─'.repeat(60));
            console.log('✅ SERVIDOR INICIADO EXITOSAMENTE');
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log(`🏭 Sistema: Producción de Armarios ABC`);
            console.log(`🗃️ Base de datos: ${process.env.DB_NAME}`);
            console.log(`📡 API Base: http://localhost:${PORT}/api`);
            console.log(`🏥 Health: http://localhost:${PORT}/health`);
            console.log('─'.repeat(60));
        });
        
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error.message);
        process.exit(1);
    }
}

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
    console.log('🛑 Cerrando servidor...');
    await mongoose.connection.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 Cerrando servidor...');
    await mongoose.connection.close();
    process.exit(0);
});

// Iniciar aplicación
startServer();

module.exports = app;