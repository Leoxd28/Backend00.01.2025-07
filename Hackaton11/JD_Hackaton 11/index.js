const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Importaciones
const { connectToMongoDB, getDatabase } = require('./db');
const listaComprasRoutes = require('./listaCompras.routes');

const app = express();
// CORRECCIÓN: Asegurar que use puerto 8000 por defecto
const PORT = process.env.PORT || 8000;

console.log('🚀 Iniciando servidor Lista de Compras...');
console.log('📍 Puerto configurado:', PORT);

// Middlewares - CONFIGURACIÓN CORS CORREGIDA
app.use(cors({
    origin: [
        'http://localhost:5501',
        'http://127.0.0.1:5501',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:8000',
        'http://127.0.0.1:8000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Middleware para parsear JSON
app.use(express.json({
    limit: '10mb',
    strict: true
}));

// Middleware para URL encoded
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0'
}));

// ===== RUTAS DE LA API =====
app.use('/api/lista-compras', listaComprasRoutes);

// Ruta principal - servir index.html
app.get('/', (req, res) => {
    console.log('📄 Sirviendo index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de salud del servidor - CORREGIDA
app.get('/health', async (req, res) => {
    try {
        const database = getDatabase();
        const dbStatus = database ? 'connected' : 'disconnected';
        
        const response = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: dbStatus,
            port: PORT,
            environment: process.env.NODE_ENV || 'development',
            cors: 'enabled',
            message: 'Servidor funcionando correctamente'
        };
        
        console.log('🏥 Health check:', response);
        res.json(response);
    } catch (error) {
        console.error('❌ Error en health check:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// Ruta de prueba CORS
app.get('/test-cors', (req, res) => {
    console.log('🧪 Test CORS endpoint accessed');
    console.log('🔍 Headers:', req.headers);
    res.json({
        message: 'CORS test successful',
        origin: req.get('Origin'),
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Ruta de prueba
app.get('/test', (req, res) => {
    console.log('🧪 Test endpoint accessed');
    res.json({
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
        timestamp: new Date().toISOString()
    });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(404).json({
            status: 'error',
            message: 'Endpoint no encontrado',
            path: req.originalUrl,
            availableEndpoints: [
                'GET /api/lista-compras',
                'POST /api/lista-compras',
                'GET /api/lista-compras/pendientes',
                'GET /api/lista-compras/completados',
                'PATCH /api/lista-compras/:id/completar',
                'DELETE /api/lista-compras/:id'
            ]
        });
    }
    
    // Para otras rutas, servir index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Función para iniciar el servidor - CORREGIDA
async function startServer() {
    try {
        console.log('🔗 Conectando a MongoDB Atlas...');
        
        // Intentar conectar a MongoDB
        const database = await connectToMongoDB();
        
        if (database) {
            console.log('✅ Conexión a MongoDB Atlas exitosa');
            console.log(`🗃️ Base de datos: ${process.env.DB_NAME}`);
        } else {
            console.log('⚠️ Funcionando sin base de datos (modo fallback)');
        }
        
        // Iniciar servidor HTTP - FORZAR PUERTO 8000
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log('─'.repeat(70));
            console.log('✅ SERVIDOR INICIADO EXITOSAMENTE');
            console.log(`🌐 URL Local: http://localhost:${PORT}`);
            console.log(`🌐 URL Red: http://127.0.0.1:${PORT}`);
            console.log(`🔗 API Base: http://localhost:${PORT}/api/lista-compras`);
            console.log(`🏥 Health: http://localhost:${PORT}/health`);
            console.log(`🧪 Test CORS: http://localhost:${PORT}/test-cors`);
            console.log(`📱 Frontend debe usar puerto: 5501`);
            console.log(`🔧 CORS configurado para: localhost:5501, 127.0.0.1:5501`);
            console.log('─'.repeat(70));
        });
        
        // Configurar timeout del servidor
        server.timeout = 30000;
        
        // Manejar errores del servidor
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Puerto ${PORT} ya está en uso`);
                console.log('💡 Soluciones:');
                console.log(`   1. Cambiar puerto: set PORT=${PORT + 1} && npm run dev`);
                console.log('   2. Terminar proceso: taskkill /F /IM node.exe');
                console.log(`   3. Usar netstat: netstat -ano | findstr :${PORT}`);
            } else {
                console.error('❌ Error del servidor:', error.message);
            }
            process.exit(1);
        });
        
        // Manejar cierre graceful
        const gracefulShutdown = async (signal) => {
            console.log(`\n🛑 Señal ${signal} recibida - Cerrando servidor...`);
            
            server.close(async () => {
                console.log('🔌 Servidor HTTP cerrado');
                
                try {
                    const { closeConnection } = require('./db');
                    await closeConnection();
                    console.log('🗃️ Conexión a MongoDB cerrada');
                } catch (error) {
                    console.error('❌ Error cerrando MongoDB:', error.message);
                }
                
                console.log('✅ Cierre graceful completado');
                process.exit(0);
            });
            
            // Forzar cierre después de 30 segundos
            setTimeout(() => {
                console.error('❌ Forzando cierre del servidor');
                process.exit(1);
            }, 30000);
        };
        
        // Registrar manejadores de señales
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        
        // Manejar errores no capturados
        process.on('unhandledRejection', (reason, promise) => {
            console.error('❌ Promise rechazada no manejada:', reason);
        });
        
        process.on('uncaughtException', (error) => {
            console.error('❌ Excepción no capturada:', error);
            gracefulShutdown('UNCAUGHT_EXCEPTION');
        });
        
        return server;
        
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error.message);
        process.exit(1);
    }
}

// Iniciar la aplicación
if (require.main === module) {
    startServer();
}

module.exports = app;