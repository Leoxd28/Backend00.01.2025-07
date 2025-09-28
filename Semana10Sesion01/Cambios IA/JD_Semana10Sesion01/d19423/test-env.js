require('dotenv').config();

console.log('=== ENVIRONMENT VARIABLES TEST ===');
console.log('DB_HOST:', `"${process.env.DB_HOST}"`);
console.log('DB_PORT:', `"${process.env.DB_PORT}"`);
console.log('DB_NAME:', `"${process.env.DB_NAME}"`);
console.log('DB_USER:', `"${process.env.DB_USER}"`);
console.log('DB_PASS:', `"${process.env.DB_PASS}"`);
console.log('DB_DIALECT:', `"${process.env.DB_DIALECT}"`);

// Test directo de conexión MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err.message);
    } else {
        console.log('✅ MySQL connection successful!');
        connection.end();
    }
});