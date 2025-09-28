
/*// src/sync-db.js
const sequelize = require('./db');

module.exports = async function syncDb() {
  const strategy = process.env.DB_SYNC || 'none'; // none | alter | force
  const options = { logging: false };
  if (strategy === 'alter') options.alter = true;
  if (strategy === 'force') options.force = true;

  console.log('[sync] strategy =', strategy);
  await sequelize.sync(options);
};*/













 







const sequelize = require('./db');
const { User, Post } = require('./models');

console.log('🔄 [sync] Database synchronization module loaded');

const syncDb = async () => {
    try {
        console.log('🔄 [sync] Starting database synchronization...');
        
        // Verificar conexión antes de sincronizar
        await sequelize.authenticate();
        console.log('✅ [sync] Database connection verified');
        
        // Obtener información de modelos
        const modelNames = Object.keys(sequelize.models);
        console.log('📋 [sync] Models to synchronize:', modelNames);
        console.log('📊 [sync] Total models:', modelNames.length);
        
        // Configuración de sincronización
        const syncOptions = {
            force: false,        // No eliminar tablas existentes
            alter: false,        // No alterar estructura automáticamente
            logging: (sql) => {  // Log SQL queries
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
        await sequelize.sync(syncOptions);
        
        // Verificar tablas creadas
        const [tables] = await sequelize.query("SHOW TABLES");
        console.log('📊 [sync] Tables in database:', tables.map(t => Object.values(t)[0]));
        
        // Verificar estructura de tablas principales
        try {
            const [userColumns] = await sequelize.query("DESCRIBE users");
            console.log('👥 [sync] Users table columns:', userColumns.length);
            
            const [postColumns] = await sequelize.query("DESCRIBE posts");
            console.log('📝 [sync] Posts table columns:', postColumns.length);
        } catch (error) {
            console.log('ℹ️ [sync] Could not describe tables (they might not exist yet)');
        }
        
        console.log('✅ [sync] Database synchronization completed successfully!');
        console.log('🎉 [sync] All models are now synchronized with the database');
        
        return {
            success: true,
            models: modelNames,
            tablesCount: tables.length,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('❌ [sync] Database synchronization failed:', error.message);
        console.error('🔍 [sync] Error details:', {
            code: error.original?.code,
            errno: error.original?.errno,
            sqlState: error.original?.sqlState,
            sqlMessage: error.original?.sqlMessage
        });
        
        // Si es un error de conexión, dar sugerencias
        if (error.original?.code === 'ECONNREFUSED') {
            console.error('💡 [sync] Suggestion: Make sure MySQL server is running');
        } else if (error.original?.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 [sync] Suggestion: Check database credentials in .env file');
        } else if (error.original?.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 [sync] Suggestion: Create the database first or check DB_NAME in .env');
        }
        
        throw error;
    }
};

// Test function para verificar modelos
const testModels = async () => {
    try {
        console.log('🧪 [sync] Testing model definitions...');
        
        // Test User model
        const userAttributes = Object.keys(User.rawAttributes);
        console.log('👥 [sync] User model attributes:', userAttributes);
        
        // Test Post model
        const postAttributes = Object.keys(Post.rawAttributes);
        console.log('📝 [sync] Post model attributes:', postAttributes);
        
        // Test associations
        console.log('🔗 [sync] User associations:', Object.keys(User.associations));
        console.log('🔗 [sync] Post associations:', Object.keys(Post.associations));
        
        console.log('✅ [sync] Model definitions are valid');
        return true;
        
    } catch (error) {
        console.error('❌ [sync] Model test failed:', error.message);
        return false;
    }
};

module.exports = { 
    syncDb,
    testModels
};