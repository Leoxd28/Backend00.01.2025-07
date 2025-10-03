require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('🔍 [db] Database Environment Variables:');
console.log('🔍 [db] DB_HOST:', process.env.DB_HOST);
console.log('🔍 [db] DB_USER:', process.env.DB_USER);
console.log('🔍 [db] DB_PASS:', process.env.DB_PASS ? '✅ SET' : '❌ NOT SET');
console.log('🔍 [db] DB_NAME:', process.env.DB_NAME);
console.log('🔍 [db] DB_SYNC:', process.env.DB_SYNC);

const sequelize = new Sequelize(
    process.env.DB_NAME || 'mini_learning_platform',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            charset: 'utf8mb4',
            connectTimeout: 60000,
            acquireTimeout: 60000,
            timeout: 60000
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        }
    }
);

// Test connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ [db] Database connection established successfully!');
    })
    .catch(err => {
        console.error('❌ [db] Unable to connect to database:', err.message);
        console.error('🔍 [db] Full error:', err);
    });

module.exports = sequelize;


/*const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
process.env.DB_DATABASE,
process.env.DB_USERNAME,
process.env.DB_PASSWORD,
{ host: process.env.DB_HOST, dialect: process.env.DB_DIALECT, logging: false }
);


module.exports = sequelize;*/