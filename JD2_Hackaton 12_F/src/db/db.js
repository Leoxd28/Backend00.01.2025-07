const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.DB_NAME || 'SV43123322_Hackaton12';

class DatabaseConnection {
    constructor() {
        this.connection = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            if (this.isConnected) {
                console.log('📱 Ya conectado a MongoDB');
                return this.connection;
            }

            console.log('🔗 Estableciendo conexión a MongoDB Atlas...');
            console.log(`🗃️ Base de datos objetivo: ${DB_NAME}`);

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,
                minPoolSize: 5,
                maxIdleTimeMS: 30000,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                bufferMaxEntries: 0,
                family: 4
            };

            this.connection = await mongoose.connect(MONGO_URI, options);
            this.isConnected = true;

            console.log('✅ Conexión exitosa a MongoDB Atlas');
            console.log(`🌐 Host: ${this.connection.connection.host}`);
            console.log(`🗃️ Base de datos: ${this.connection.connection.name}`);

            // Event listeners
            mongoose.connection.on('error', (error) => {
                console.error('❌ Error de MongoDB:', error);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.warn('⚠️ MongoDB desconectado');
                this.isConnected = false;
            });

            mongoose.connection.on('reconnected', () => {
                console.log('🔄 MongoDB reconectado');
                this.isConnected = true;
            });

            return this.connection;

        } catch (error) {
            console.error('❌ Error conectando a MongoDB:', error.message);
            this.isConnected = false;
            
            if (error.message.includes('authentication failed')) {
                console.error('💡 Verificar credenciales de MongoDB Atlas');
            } else if (error.message.includes('ENOTFOUND')) {
                console.error('💡 Verificar conexión a internet y URL de MongoDB');
            }
            
            throw error;
        }
    }

    async disconnect() {
        try {
            if (this.isConnected && this.connection) {
                await mongoose.connection.close();
                this.isConnected = false;
                console.log('🔌 Desconectado de MongoDB');
            }
        } catch (error) {
            console.error('❌ Error desconectando de MongoDB:', error.message);
        }
    }

    getConnection() {
        return this.connection;
    }

    isConnectionActive() {
        return this.isConnected && mongoose.connection.readyState === 1;
    }

    async ping() {
        try {
            if (this.isConnectionActive()) {
                await mongoose.connection.db.admin().ping();
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Ping a MongoDB falló:', error.message);
            return false;
        }
    }
}

// Instancia singleton
const dbConnection = new DatabaseConnection();

module.exports = {
    connect: () => dbConnection.connect(),
    disconnect: () => dbConnection.disconnect(),
    getConnection: () => dbConnection.getConnection(),
    isConnected: () => dbConnection.isConnectionActive(),
    ping: () => dbConnection.ping(),
    mongoose
};
