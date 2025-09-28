
/*
// src/server.js
const express = require('express');
const { sequelize, User, Post, Comment } = require('./models');
const syncDb = require('./sync-db');

const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000, async () => {
  try {
   // await sequelize.authenticate();
    await syncDb(); // ← sincroniza según DB_SYNC
    console.log('DB OK & synced');
  } catch (e) {
    console.error('DB FAIL', e);
  }
  console.log('Server ready');
});*/

 



 













 

























































// IMPORTANTE: dotenv debe estar AL INICIO
require('dotenv').config();

const express = require('express');
const { syncDb } = require('./sync-db');

const app = express();

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS para desarrollo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes principales
app.get('/', (req, res) => {
    res.json({ 
        message: 'Blog API is running successfully!',
        version: '1.0.0',
        database: 'blog_app',
        status: 'active',
        timestamp: new Date().toISOString(),
        endpoints: {
            home: '/',
            health: '/health',
            api_status: '/api/status',
            users: '/api/users',
            posts: '/api/posts'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: 'connected',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`,
        memory: process.memoryUsage(),
        version: process.version
    });
});

// API Routes
app.get('/api/status', (req, res) => {
    res.json({ 
        api: 'Blog API',
        version: '1.0.0',
        status: 'operational',
        database: 'blog_app',
        endpoints: [
            'GET /',
            'GET /health',
            'GET /api/status',
            'GET /api/users',
            'GET /api/posts'
        ]
    });
});

app.get('/api/users', (req, res) => {
    res.json({ 
        message: 'Users endpoint',
        status: 'coming soon',
        count: 0,
        users: [],
        next_steps: 'Implementation pending'
    });
});

app.get('/api/posts', (req, res) => {
    res.json({ 
        message: 'Posts endpoint',
        status: 'coming soon', 
        count: 0,
        posts: [],
        next_steps: 'Implementation pending'
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({
        message: 'Test endpoint working',
        timestamp: new Date().toISOString(),
        server_info: {
            node_version: process.version,
            platform: process.platform,
            uptime: process.uptime()
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ [server] Error:', err.message);
    console.error('🔍 [server] Stack:', err.stack);
    
    res.status(err.status || 500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// 🔧 SOLUCIÓN CRÍTICA: Cambiar app.get('*') por app.use() para evitar PathError
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method,
        message: `The requested resource ${req.originalUrl} was not found on this server`,
        available_endpoints: [
            'GET /',
            'GET /health', 
            'GET /api/status',
            'GET /api/users',
            'GET /api/posts',
            'GET /test'
        ],
        timestamp: new Date().toISOString()
    });
});

// Start server function
const startServer = async () => {
    try {
        console.log('🚀 [server] Initializing Blog API server...');
        console.log('📋 [server] Node.js version:', process.version);
        console.log('🔧 [server] Environment:', process.env.NODE_ENV || 'development');
        
        // Sync database first
        console.log('📡 [server] Connecting to database...');
        await syncDb();
        
        const PORT = process.env.PORT || 3000;
        const HOST = process.env.HOST || 'localhost';
        
        const server = app.listen(PORT, HOST, () => {
            console.log('');
            console.log('✅ [server] =================================');
            console.log('✅ [server] Blog API Server Started!');
            console.log('✅ [server] =================================');
            console.log(`📝 [server] URL: http://${HOST}:${PORT}`);
            console.log(`🔍 [server] Health: http://${HOST}:${PORT}/health`);
            console.log(`📋 [server] API Status: http://${HOST}:${PORT}/api/status`);
            console.log('🎯 [server] Available endpoints:');
            console.log(`   GET  http://${HOST}:${PORT}/`);
            console.log(`   GET  http://${HOST}:${PORT}/health`);
            console.log(`   GET  http://${HOST}:${PORT}/api/status`);
            console.log(`   GET  http://${HOST}:${PORT}/api/users`);
            console.log(`   GET  http://${HOST}:${PORT}/api/posts`);
            console.log(`   GET  http://${HOST}:${PORT}/test`);
            console.log('✅ [server] =================================');
            console.log('');
        });

        // Graceful shutdown
        const gracefulShutdown = () => {
            console.log('\n🛑 [server] Shutting down gracefully...');
            server.close(() => {
                console.log('✅ [server] Server closed successfully');
                process.exit(0);
            });
        };

        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
        
    } catch (error) {
        console.error('❌ [server] Failed to start server:', error.message);
        console.error('🔍 [server] Full error:', error);
        process.exit(1);
    }
};

// Unhandled errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ [server] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ [server] Uncaught Exception:', error);
    process.exit(1);
});

// Start the server
startServer();








