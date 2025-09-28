/*const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
process.env.DB_DATABASE,
process.env.DB_USERNAME,
process.env.DB_PASS,
{ host: process.env.DB_HOST, dialect: process.env.DB_DIALECT, logging: false }
);


module.exports = sequelize;*/


 

































const sequelize = require('./db');
const { User, Post } = require('./models');

console.log('🔄 [sync] Database synchronization module loaded');

const syncDb = async () => {
    try {
        console.log('🔄 [sync] Starting database synchronization...');
        
        // Verificar conexión antes de sincronizar
        console.log('📡 [sync] Verifying database connection...');
        await sequelize.authenticate();
        console.log('✅ [sync] Database connection verified');
        
        // Obtener información de modelos
        const modelNames = Object.keys(sequelize.models);
        console.log('📋 [sync] Models to synchronize:', modelNames);
        console.log('📊 [sync] Total models:', modelNames.length);
        
        // Verificar que los modelos estén definidos
        if (modelNames.length === 0) {
            console.warn('⚠️ [sync] No models found to synchronize');
            return { success: false, message: 'No models found' };
        }
        
        // Configuración de sincronización
        const syncOptions = {
            force: false,        // No eliminar tablas existentes
            alter: false,        // No alterar estructura automáticamente
            logging: (sql) => {  // Log SQL queries solo en development
                if (process.env.NODE_ENV === 'development') {
                    console.log('🔍 [sync] SQL:', sql);
                }
            }
        };
        
        console.log('⚙️ [sync] Sync options:', {
            force: syncOptions.force,
            alter: syncOptions.alter,
            logging: !!syncOptions.logging
        });
        
        // Ejecutar sincronización
        console.log('📡 [sync] Synchronizing models with database...');
        const syncResult = await sequelize.sync(syncOptions);
        console.log('✅ [sync] Sequelize sync completed');
        
        // Verificar tablas creadas
        try {
            const [tables] = await sequelize.query("SHOW TABLES");
            const tableNames = tables.map(t => Object.values(t)[0]);
            console.log('📊 [sync] Tables in database:', tableNames);
            
            // Verificar estructura de tablas principales
            if (tableNames.includes('users')) {
                const [userColumns] = await sequelize.query("DESCRIBE users");
                console.log('👥 [sync] Users table structure:');
                userColumns.forEach(col => {
                    console.log(`   - ${col.Field} (${col.Type})`);
                });
            }
            
            if (tableNames.includes('posts')) {
                const [postColumns] = await sequelize.query("DESCRIBE posts");
                console.log('📝 [sync] Posts table structure:');
                postColumns.forEach(col => {
                    console.log(`   - ${col.Field} (${col.Type})`);
                });
            }
            
        } catch (tableError) {
            console.log('ℹ️ [sync] Could not describe tables:', tableError.message);
        }
        
        // Verificar asociaciones
        console.log('🔗 [sync] Verifying model associations...');
        Object.keys(sequelize.models).forEach(modelName => {
            const model = sequelize.models[modelName];
            const associations = Object.keys(model.associations);
            if (associations.length > 0) {
                console.log(`🔗 [sync] ${modelName} associations:`, associations);
            }
        });
        
        console.log('✅ [sync] Database synchronization completed successfully!');
        console.log('🎉 [sync] All models are now synchronized with the database');
        
        return {
            success: true,
            models: modelNames,
            tablesCount: tables?.length || 0,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('❌ [sync] Database synchronization failed:', error.message);
        console.error('🔍 [sync] Error details:', {
            name: error.name,
            code: error.original?.code,
            errno: error.original?.errno,
            sqlState: error.original?.sqlState,
            sqlMessage: error.original?.sqlMessage
        });
        
        // Sugerencias según el tipo de error
        if (error.original?.code === 'ECONNREFUSED') {
            console.error('💡 [sync] Suggestion: Make sure MySQL server is running');
            console.error('💡 [sync] Command: net start mysql80 (Windows) or sudo systemctl start mysql (Linux)');
        } else if (error.original?.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 [sync] Suggestion: Check database credentials in .env file');
            console.error('💡 [sync] Verify DB_USER and DB_PASS values');
        } else if (error.original?.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 [sync] Suggestion: Create the database first');
            console.error('💡 [sync] SQL: CREATE DATABASE blog_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
        } else if (error.original?.code === 'ENOTFOUND') {
            console.error('💡 [sync] Suggestion: Check DB_HOST value in .env file');
        }
        
        throw error;
    }
};

// Test function para verificar modelos
const testModels = async () => {
    try {
        console.log('🧪 [sync] Testing model definitions...');
        
        // Verificar que los modelos existen
        if (!User || !Post) {
            console.error('❌ [sync] Models not properly imported');
            return false;
        }
        
        // Test User model
        const userAttributes = Object.keys(User.rawAttributes);
        console.log('👥 [sync] User model attributes:', userAttributes);
        console.log('👥 [sync] User model table name:', User.tableName);
        
        // Test Post model
        const postAttributes = Object.keys(Post.rawAttributes);
        console.log('📝 [sync] Post model attributes:', postAttributes);
        console.log('📝 [sync] Post model table name:', Post.tableName);
        
        // Test associations
        console.log('🔗 [sync] User associations:', Object.keys(User.associations));
        console.log('🔗 [sync] Post associations:', Object.keys(Post.associations));
        
        // Verificar que las asociaciones están bien definidas
        if (!User.associations.posts) {
            console.warn('⚠️ [sync] User.posts association not found');
        }
        if (!Post.associations.author) {
            console.warn('⚠️ [sync] Post.author association not found');
        }
        
        console.log('✅ [sync] Model definitions are valid');
        return true;
        
    } catch (error) {
        console.error('❌ [sync] Model test failed:', error.message);
        console.error('🔍 [sync] Error details:', error);
        return false;
    }
};

// Function para verificar la salud de la base de datos
const healthCheck = async () => {
    try {
        await sequelize.authenticate();
        const [result] = await sequelize.query('SELECT 1 as health_check');
        return { healthy: true, result: result[0] };
    } catch (error) {
        return { healthy: false, error: error.message };
    }
};

module.exports = { 
    syncDb,
    testModels,
    healthCheck
};