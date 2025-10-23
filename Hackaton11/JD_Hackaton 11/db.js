const { MongoClient } = require('mongodb');
require('dotenv').config();

let client = null;
let db = null;

// Configuración de MongoDB Atlas - CORREGIDA
const config = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'SV43123322',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Aumentado para Atlas
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        retryWrites: true,
        w: 'majority'
    }
};

// Conectar a MongoDB Atlas - FUNCIÓN CORREGIDA
async function connectToMongoDB() {
    try {
        console.log('🔌 Intentando conectar a MongoDB Atlas...');
        console.log('📍 URL:', config.url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Ocultar credenciales
        console.log('🗃️ Base de datos:', config.dbName);
        
        client = new MongoClient(config.url, config.options);
        
        // Conectar con timeout
        console.log('⏳ Estableciendo conexión...');
        await client.connect();
        
        // Verificar conexión con ping
        console.log('🏓 Verificando conexión...');
        await client.db('admin').command({ ping: 1 });
        
        db = client.db(config.dbName);
        
        console.log('✅ Conectado exitosamente a MongoDB Atlas');
        console.log(`🎯 Base de datos activa: ${config.dbName}`);
        
        // Crear índices si es necesario
        await crearIndices();
        
        // Configurar eventos de conexión
        setupEventHandlers();
        
        return db;
        
    } catch (error) {
        console.error('❌ Error conectando a MongoDB Atlas:', error.message);
        
        // Detalles específicos del error
        if (error.message.includes('authentication failed')) {
            console.error('🔐 Error de autenticación: Verifica usuario y contraseña');
        } else if (error.message.includes('network')) {
            console.error('🌐 Error de red: Verifica tu conexión a internet');
        } else if (error.message.includes('timeout')) {
            console.error('⏰ Timeout: El servidor tardó demasiado en responder');
        }
        
        console.warn('⚠️ Continuando sin base de datos (modo memoria)');
        
        // No lanzar error, permitir continuar sin DB
        db = null;
        client = null;
        
        return null;
    }
}

// Crear índices para optimización
async function crearIndices() {
    try {
        if (!db) return;
        
        console.log('📑 Creando índices en MongoDB Atlas...');
        
        const collection = db.collection('listaCompras');
        
        // Verificar si la colección existe
        const collections = await db.listCollections().toArray();
        const existeColeccion = collections.some(col => col.name === 'listaCompras');
        
        if (!existeColeccion) {
            console.log('🏗️ Creando colección listaCompras...');
            await db.createCollection('listaCompras');
        }
        
        // Índice para fecha de creación (ordenamiento)
        await collection.createIndex({ fechaCreacion: -1 });
        
        // Índice para estado completado (filtros)
        await collection.createIndex({ esCompletado: 1 });
        
        // Índice compuesto para búsquedas eficientes
        await collection.createIndex({ 
            nombre: 1, 
            esCompletado: 1 
        });
        
        console.log('✅ Índices creados exitosamente en Atlas');
        
    } catch (error) {
        console.warn('⚠️ Error creando índices en Atlas:', error.message);
        // No es crítico, continuar
    }
}

// Obtener la base de datos
function getDatabase() {
    return db;
}

// Obtener el cliente
function getClient() {
    return client;
}

// Cerrar conexión
async function closeConnection() {
    try {
        if (client) {
            console.log('🔌 Cerrando conexión a MongoDB Atlas...');
            await client.close();
            client = null;
            db = null;
            console.log('✅ Conexión cerrada exitosamente');
        }
    } catch (error) {
        console.error('❌ Error cerrando conexión:', error.message);
    }
}

// Verificar estado de conexión
function isConnected() {
    return client && client.topology && client.topology.isConnected();
}

// Reconectar si es necesario
async function reconnectIfNeeded() {
    try {
        if (!isConnected()) {
            console.log('🔄 Reconectando a MongoDB Atlas...');
            return await connectToMongoDB();
        }
        return db;
    } catch (error) {
        console.error('❌ Error en reconexión:', error.message);
        return null;
    }
}

// Configurar eventos de conexión - MEJORADO PARA ATLAS
function setupEventHandlers() {
    if (client) {
        client.on('serverOpening', () => {
            console.log('🔓 Servidor MongoDB Atlas abriendo conexión');
        });
        
        client.on('serverClosed', () => {
            console.log('🔒 Servidor MongoDB Atlas cerró conexión');
        });
        
        client.on('error', (error) => {
            console.error('❌ Error en cliente MongoDB Atlas:', error.message);
        });
        
        client.on('close', () => {
            console.log('🔌 Conexión MongoDB Atlas cerrada');
        });
        
        client.on('reconnect', () => {
            console.log('🔄 Reconectado a MongoDB Atlas');
        });
    }
}

// Manejo de cierre de proceso
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando aplicación...');
    await closeConnection();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Terminando aplicación...');
    await closeConnection();
    process.exit(0);
});

module.exports = {
    connectToMongoDB,
    getDatabase,
    getClient,
    closeConnection,
    isConnected,
    reconnectIfNeeded,
    setupEventHandlers
};