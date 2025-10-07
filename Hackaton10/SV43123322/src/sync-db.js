const sequelize = require('./db');
const { User, Course, Lesson, Enrollment, Comment } = require('./models');

console.log('🔄 [sync] Mini Learning Platform - Database synchronization module loaded');

const syncDb = async () => {
    try {
        console.log('🔄 [sync] Starting Mini Learning Platform database synchronization...');
        
        // Verificar conexión antes de sincronizar
        console.log('📡 [sync] Verifying database connection...');
        await sequelize.authenticate();
        console.log('✅ [sync] Database connection verified successfully');
        
        // Obtener información de modelos
        const modelNames = Object.keys(sequelize.models);
        console.log('📋 [sync] Models to synchronize:', modelNames);
        console.log('📊 [sync] Total models:', modelNames.length);
        
        // Verificar que los modelos estén definidos
        if (modelNames.length === 0) {
            console.warn('⚠️ [sync] No models found to synchronize');
            return { success: false, message: 'No models found' };
        }
        
        // Configuración de sincronización basada en DB_SYNC
        const syncStrategy = process.env.DB_SYNC || 'none';
        let syncOptions = {
            logging: process.env.NODE_ENV === 'development' ? console.log : false
        };
        
        // Aplicar estrategia de sincronización
        switch (syncStrategy.toLowerCase()) {
            case 'force':
                syncOptions.force = true;
                console.log('🔥 [sync] Using FORCE sync - All tables will be dropped and recreated!');
                break;
            case 'alter':
                syncOptions.alter = true;
                console.log('⚡ [sync] Using ALTER sync - Tables will be altered to match models');
                break;
            case 'none':
            default:
                syncOptions.force = false;
                syncOptions.alter = false;
                console.log('🔒 [sync] Using SAFE sync - No destructive changes will be made');
                break;
        }
        
        console.log('⚙️ [sync] Sync options:', {
            force: syncOptions.force || false,
            alter: syncOptions.alter || false,
            logging: !!syncOptions.logging,
            strategy: syncStrategy
        });
        
        // Ejecutar sincronización
        console.log('📡 [sync] Synchronizing models with database...');
        await sequelize.sync(syncOptions);
        console.log('✅ [sync] Sequelize sync completed successfully');
        
        // Verificar tablas creadas
        let tableNames = [];
        try {
            const [tables] = await sequelize.query("SHOW TABLES");
            tableNames = tables.map(t => Object.values(t)[0]);
            console.log('📊 [sync] Tables in database:', tableNames);
            
            // Verificar estructura de tablas principales
            const expectedTables = ['users', 'courses', 'lessons', 'enrollments', 'comments'];
            const missingTables = expectedTables.filter(table => !tableNames.includes(table));
            
            if (missingTables.length > 0) {
                console.warn('⚠️ [sync] Missing tables:', missingTables);
            } else {
                console.log('✅ [sync] All expected tables found');
            }
            
            // Describir estructura de tablas principales si existen
            for (const tableName of expectedTables) {
                if (tableNames.includes(tableName)) {
                    try {
                        const [columns] = await sequelize.query(`DESCRIBE ${tableName}`);
                        console.log(`📝 [sync] ${tableName} table (${columns.length} columns):`);
                        columns.slice(0, 5).forEach(col => { // Solo mostrar primeras 5 columnas
                            console.log(`   - ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? col.Key : ''}`);
                        });
                        if (columns.length > 5) {
                            console.log(`   ... and ${columns.length - 5} more columns`);
                        }
                    } catch (describeError) {
                        console.log(`ℹ️ [sync] Could not describe ${tableName}:`, describeError.message);
                    }
                }
            }
            
        } catch (tableError) {
            console.log('ℹ️ [sync] Could not query tables:', tableError.message);
        }
        
        // Verificar asociaciones
        console.log('🔗 [sync] Verifying model associations...');
        const associationSummary = {};
        Object.keys(sequelize.models).forEach(modelName => {
            const model = sequelize.models[modelName];
            const associations = Object.keys(model.associations);
            if (associations.length > 0) {
                associationSummary[modelName] = associations;
                console.log(`🔗 [sync] ${modelName} associations: ${associations.join(', ')}`);
            }
        });
        
        // Verificar índices críticos
        console.log('📊 [sync] Verifying critical indexes...');
        try {
            // Verificar índices de users
            const [userIndexes] = await sequelize.query("SHOW INDEX FROM users WHERE Key_name != 'PRIMARY'");
            console.log(`📊 [sync] Users indexes: ${userIndexes.length} found`);
            
            // Verificar índices de courses
            const [courseIndexes] = await sequelize.query("SHOW INDEX FROM courses WHERE Key_name != 'PRIMARY'");
            console.log(`📊 [sync] Courses indexes: ${courseIndexes.length} found`);
            
            // Verificar foreign keys de enrollments
            const [fkEnrollments] = await sequelize.query(`
                SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                WHERE TABLE_NAME = 'enrollments' AND REFERENCED_TABLE_NAME IS NOT NULL
            `);
            console.log(`🔗 [sync] Enrollments foreign keys: ${fkEnrollments.length} found`);
            
        } catch (indexError) {
            console.log('ℹ️ [sync] Could not verify indexes:', indexError.message);
        }
        
        // Estadísticas finales
        console.log('');
        console.log('✅ ================================================');
        console.log('✅ MINI LEARNING PLATFORM - DATABASE SYNC COMPLETE');
        console.log('✅ ================================================');
        console.log(`📊 Strategy: ${syncStrategy.toUpperCase()}`);
        console.log(`📋 Models: ${modelNames.length} synchronized`);
        console.log(`🗂️ Tables: ${tableNames.length} in database`);
        console.log(`🔗 Associations: ${Object.keys(associationSummary).length} models with relationships`);
        console.log('✅ ================================================');
        console.log('');
        
        return {
            success: true,
            strategy: syncStrategy,
            models: modelNames,
            tablesCount: tableNames.length,
            associations: associationSummary,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('');
        console.error('❌ ================================================');
        console.error('❌ DATABASE SYNCHRONIZATION FAILED');
        console.error('❌ ================================================');
        console.error('❌ [sync] Error:', error.message);
        console.error('🔍 [sync] Error details:', {
            name: error.name,
            code: error.original?.code,
            errno: error.original?.errno,
            sqlState: error.original?.sqlState,
            sqlMessage: error.original?.sqlMessage,
            table: error.table
        });
        
        // Sugerencias específicas según el tipo de error
        if (error.original?.code === 'ECONNREFUSED') {
            console.error('💡 [sync] SOLUTION: Start MySQL server');
            console.error('   Windows: net start mysql80');
            console.error('   Linux: sudo systemctl start mysql');
            console.error('   macOS: brew services start mysql');
        } else if (error.original?.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 [sync] SOLUTION: Check database credentials in .env');
            console.error('   Verify DB_USER and DB_PASS values');
            console.error('   Current DB_USER:', process.env.DB_USER || 'NOT SET');
        } else if (error.original?.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 [sync] SOLUTION: Create the database first');
            console.error('   SQL: CREATE DATABASE mini_learning_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
            console.error('   Current DB_NAME:', process.env.DB_NAME || 'NOT SET');
        } else if (error.original?.code === 'ENOTFOUND') {
            console.error('💡 [sync] SOLUTION: Check DB_HOST value in .env');
            console.error('   Current DB_HOST:', process.env.DB_HOST || 'NOT SET');
        } else if (error.name === 'SequelizeValidationError') {
            console.error('💡 [sync] SOLUTION: Fix model validation errors');
            error.errors?.forEach(err => {
                console.error(`   - ${err.path}: ${err.message}`);
            });
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('💡 [sync] SOLUTION: Check foreign key relationships');
            console.error(`   - Table: ${error.table}`);
            console.error(`   - Fields: ${error.fields}`);
        }
        
        console.error('❌ ================================================');
        console.error('');
        
        throw error;
    }
};

// Test function para verificar modelos
const testModels = async () => {
    try {
        console.log('🧪 [sync] Testing Mini Learning Platform model definitions...');
        
        // Verificar que los modelos existen
        const models = { User, Course, Lesson, Enrollment, Comment };
        const missingModels = [];
        
        Object.entries(models).forEach(([name, model]) => {
            if (!model) {
                missingModels.push(name);
            }
        });
        
        if (missingModels.length > 0) {
            console.error('❌ [sync] Missing models:', missingModels);
            return false;
        }
        
        // Test User model
        const userAttributes = Object.keys(User.rawAttributes);
        console.log('👥 [sync] User model:');
        console.log(`   - Attributes: ${userAttributes.join(', ')}`);
        console.log(`   - Table name: ${User.tableName}`);
        console.log(`   - Associations: ${Object.keys(User.associations).join(', ') || 'none'}`);
        
        // Test Course model
        const courseAttributes = Object.keys(Course.rawAttributes);
        console.log('📚 [sync] Course model:');
        console.log(`   - Attributes: ${courseAttributes.join(', ')}`);
        console.log(`   - Table name: ${Course.tableName}`);
        console.log(`   - Associations: ${Object.keys(Course.associations).join(', ') || 'none'}`);
        console.log(`   - Paranoid: ${Course.options.paranoid ? 'YES' : 'NO'}`);
        
        // Test Lesson model
        const lessonAttributes = Object.keys(Lesson.rawAttributes);
        console.log('📖 [sync] Lesson model:');
        console.log(`   - Attributes: ${lessonAttributes.join(', ')}`);
        console.log(`   - Table name: ${Lesson.tableName}`);
        console.log(`   - Associations: ${Object.keys(Lesson.associations).join(', ') || 'none'}`);
        console.log(`   - Paranoid: ${Lesson.options.paranoid ? 'YES' : 'NO'}`);
        
        // Test Enrollment model
        const enrollmentAttributes = Object.keys(Enrollment.rawAttributes);
        console.log('🎓 [sync] Enrollment model:');
        console.log(`   - Attributes: ${enrollmentAttributes.join(', ')}`);
        console.log(`   - Table name: ${Enrollment.tableName}`);
        console.log(`   - Associations: ${Object.keys(Enrollment.associations).join(', ') || 'none'}`);
        
        // Test Comment model
        const commentAttributes = Object.keys(Comment.rawAttributes);
        console.log('💬 [sync] Comment model:');
        console.log(`   - Attributes: ${commentAttributes.join(', ')}`);
        console.log(`   - Table name: ${Comment.tableName}`);
        console.log(`   - Associations: ${Object.keys(Comment.associations).join(', ') || 'none'}`);
        
        // Verificar asociaciones críticas
        const criticalAssociations = [
            { model: 'User', association: 'ownedCourses' },
            { model: 'Course', association: 'owner' },
            { model: 'Course', association: 'lessons' },
            { model: 'Lesson', association: 'course' },
            { model: 'Enrollment', association: 'student' },
            { model: 'Enrollment', association: 'course' },
            { model: 'Comment', association: 'author' },
            { model: 'Comment', association: 'lesson' }
        ];
        
        let missingAssociations = [];
        criticalAssociations.forEach(({ model, association }) => {
            const modelRef = models[model];
            if (!modelRef.associations[association]) {
                missingAssociations.push(`${model}.${association}`);
            }
        });
        
        if (missingAssociations.length > 0) {
            console.warn('⚠️ [sync] Missing critical associations:', missingAssociations);
        } else {
            console.log('✅ [sync] All critical associations found');
        }
        
        console.log('✅ [sync] Model definitions test completed successfully');
        return true;
        
    } catch (error) {
        console.error('❌ [sync] Model test failed:', error.message);
        console.error('🔍 [sync] Error details:', error);
        return false;
    }
};

// Health check function
const healthCheck = async () => {
    try {
        console.log('🏥 [sync] Running database health check...');
        
        // Test connection
        await sequelize.authenticate();
        
        // Test query
        const [result] = await sequelize.query('SELECT 1 as health_check, NOW() as timestamp');
        
        // Count records in each table
        const stats = {};
        try {
            stats.users = await User.count();
            stats.courses = await Course.count();
            stats.lessons = await Lesson.count();
            stats.enrollments = await Enrollment.count();
            stats.comments = await Comment.count();
        } catch (countError) {
            console.log('ℹ️ [sync] Could not count records (tables may not exist yet)');
        }
        
        console.log('✅ [sync] Database health check passed');
        console.log('📊 [sync] Record counts:', stats);
        
        return { 
            healthy: true, 
            timestamp: result[0].timestamp,
            stats,
            connection: 'OK'
        };
    } catch (error) {
        console.error('❌ [sync] Database health check failed:', error.message);
        return { 
            healthy: false, 
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
};

module.exports = { 
    syncDb,
    testModels,
    healthCheck
};