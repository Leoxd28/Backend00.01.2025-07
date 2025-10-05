const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Importaciones
const { connectToMongoDB, getDatabase } = require('./db');
const ListaCompras = require('./models/listaCompras');
const listaComprasRoutes = require('./listaCompras.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// Variable global para el modelo
let listaComprasModel = null;

// Middlewares - CONFIGURACIÓN ROBUSTA
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://tu-dominio.com'] 
        : ['http://localhost:8000', 'http://127.0.0.1:8000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ 
    limit: '10mb',
    type: 'application/json'
}));

app.use(express.urlencoded({ 
    extended: true,
    limit: '10mb'
}));

// Middleware de logging para todas las peticiones
app.use((req, res, next) => {
    console.log(`📍 ${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para inyectar el modelo en las rutas
app.use('/api/lista-compras', (req, res, next) => {
    if (!listaComprasModel) {
        console.error('❌ Modelo no inicializado');
        return res.status(500).json({
            success: false,
            message: 'Servicio no disponible temporalmente',
            error: 'Modelo no inicializado'
        });
    }
    
    req.listaComprasModel = listaComprasModel;
    next();
});

// Rutas de la API
app.use('/api/lista-compras', listaComprasRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de salud del servidor
app.get('/health', (req, res) => {
    const { isConnected } = require('./db');
    
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: isConnected() ? 'connected' : 'disconnected',
        model: listaComprasModel ? 'initialized' : 'not initialized'
    });
});

// Middleware de manejo de errores - MEJORADO
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    
    // Verificar si es un error de JSON malformado
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'JSON malformado en la petición',
            error: 'Formato de datos inválido'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    console.warn(`⚠️ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

// Función para iniciar el servidor - CORREGIDA PARA ATLAS
async function startServer() {
    try {
        console.log('🚀 Iniciando servidor Lista de Compras...');
        console.log('📍 Puerto:', PORT);
        console.log('🌍 Entorno:', process.env.NODE_ENV || 'development');
        console.log('─'.repeat(50));
        
        // Conectar a MongoDB Atlas
        console.log('🔗 Conectando a MongoDB Atlas...');
        const database = await connectToMongoDB();
        
        // Inicializar el modelo
        console.log('📦 Inicializando modelo Lista de Compras...');
        listaComprasModel = new ListaCompras(database);
        
        if (database) {
            console.log('✅ Modelo inicializado con MongoDB Atlas');
            console.log(`🗃️ Base de datos: ${process.env.DB_NAME}`);
        } else {
            console.log('⚠️ Modelo inicializado en modo memoria (fallback)');
            console.log('💡 La aplicación funcionará pero los datos no se persistirán');
        }
        
        // Verificar controlador
        try {
            const controller = require('./controllers/listaComprasController');
            const funciones = Object.keys(controller);
            console.log('🎮 Funciones del controlador:', funciones.length);
            console.log('📋 Funciones disponibles:', funciones.join(', '));
        } catch (controllerError) {
            console.error('❌ Error cargando controlador:', controllerError.message);
        }
        
        // Iniciar servidor HTTP
        const server = app.listen(PORT, () => {
            console.log('─'.repeat(50));
            console.log('✅ Servidor iniciado exitosamente');
            console.log(`🌐 URL Local: http://localhost:${PORT}`);
            console.log(`🌐 URL Red: http://127.0.0.1:${PORT}`);
            console.log('📱 Aplicación Lista de Compras lista para usar');
            console.log('─'.repeat(50));
        });
        
        // Configurar timeout del servidor
        server.timeout = 30000; // 30 segundos
        
        // Manejar errores del servidor
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Puerto ${PORT} ya está en uso`);
                console.log('💡 Sugerencias:');
                console.log(`   - Cambiar puerto: PORT=${PORT + 1} npm run dev`);
                console.log('   - Terminar proceso existente: netstat -ano | findstr :8000');
                console.log('   - Usar otro puerto: set PORT=3001 && npm run dev');
            } else {
                console.error('❌ Error del servidor:', error.message);
            }
            process.exit(1);
        });
        
        // Manejar señales de cierre graceful
        const gracefulShutdown = async (signal) => {
            console.log(`\n🛑 Señal ${signal} recibida`);
            console.log('🔄 Iniciando cierre graceful...');
            
            server.close(async () => {
                console.log('🔌 Servidor HTTP cerrado');
                
                const { closeConnection } = require('./db');
                await closeConnection();
                
                console.log('✅ Aplicación cerrada exitosamente');
                process.exit(0);
            });
            
            // Force close after 10 seconds
            setTimeout(() => {
                console.log('⚠️ Forzando cierre después de timeout');
                process.exit(1);
            }, 10000);
        };
        
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        
    } catch (error) {
        console.error('❌ Error crítico iniciando servidor:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// Iniciar la aplicación
if (require.main === module) {
    startServer();
}

module.exports = app;