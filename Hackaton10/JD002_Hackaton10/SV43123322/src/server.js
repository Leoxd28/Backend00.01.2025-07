const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { syncDb, healthCheck } = require('./sync-db');

// Importar todas las rutas
const usersRoutes = require('./routes/users.routes');
const coursesRoutes = require('./routes/courses.routes');
const lessonsRoutes = require('./routes/lessons.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');
const commentsRoutes = require('./routes/comments.routes');

console.log('🚀 [server] Mini Learning Platform - Server initialization started');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ================================
// MIDDLEWARE GLOBAL
// ================================

// CORS configurado
app.use(cors({
  origin: NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Logging de requests
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parser de JSON con límite
app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain']
}));

// Parser de URL encoded
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Headers de seguridad básica
app.use((req, res, next) => {
  res.header('X-Powered-By', 'Mini Learning Platform API v1.0');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  // Permitir métodos HTTP
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return res.status(200).end();
  }
  
  next();
});

// Middleware de logging de requests detallado
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
  const userAgent = req.get('User-Agent') || 'unknown';
  
  console.log(`📥 [${timestamp}] ${req.method} ${req.originalUrl} - IP: ${clientIP}`);
  
  if (NODE_ENV === 'development' && req.body && Object.keys(req.body).length > 0) {
    console.log(`📄 [Request Body]:`, JSON.stringify(req.body, null, 2));
  }
  
  // Logging de respuesta
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`📤 [${timestamp}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    return originalSend.call(this, data);
  };
  
  next();
});

// ================================
// RUTAS DE SALUD Y DOCUMENTACIÓN
// ================================

// Health check endpoint con información detallada
app.get('/health', async (req, res) => {
  try {
    const startTime = Date.now();
    const health = await healthCheck();
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Mini Learning Platform API',
      version: '1.0.0',
      environment: NODE_ENV,
      uptime: Math.floor(process.uptime()),
      responseTime: `${responseTime}ms`,
      database: health,
      endpoints: {
        users: '/api/users',
        courses: '/api/courses', 
        lessons: '/api/lessons',
        enrollments: '/api/enrollments',
        comments: '/api/comments'
      }
    });
  } catch (error) {
    console.error('❌ [server] Health check failed:', error.message);
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      service: 'Mini Learning Platform API',
      error: 'Database connection failed',
      details: NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Root endpoint con información completa de la API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mini Learning Platform API',
    version: '1.0.0',
    description: 'A minimal learning platform with courses, lessons, enrollments and comments',
    author: 'SV43123322',
    case: 'Hackaton ABC - Mini Learning Platform',
    
    endpoints: {
      health: {
        url: '/health',
        method: 'GET',
        description: 'System health and database status'
      },
      users: {
        url: '/api/users',
        methods: ['GET', 'POST'],
        description: 'User management (admin, instructor, student)'
      },
      courses: {
        url: '/api/courses',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'Course management with soft deletes'
      },
      lessons: {
        url: '/api/lessons',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'Lesson management within courses'
      },
      enrollments: {
        url: '/api/enrollments',
        methods: ['GET', 'POST', 'PATCH'],
        description: 'Student enrollment management'
      },
      comments: {
        url: '/api/comments',
        methods: ['GET', 'POST'],
        description: 'Comments on lessons'
      }
    },
    
    features: [
      'Role-based access (admin, instructor, student)',
      'Soft deletes on courses and lessons',
      'Automatic slug generation',
      'Transactional enrollments',
      'Eager loading optimization',
      'Paginated responses',
      'Comprehensive validation',
      'Error handling with proper HTTP codes'
    ],
    
    documentation: {
      postman: '/docs/docs/postman-learning_platform.json',
      readme: 'README.md in project root'
    },
    
    quick_start: {
      '1_health': 'GET /health',
      '2_create_instructor': 'POST /api/users (role: instructor)',
      '3_create_course': 'POST /api/courses',
      '4_create_lesson': 'POST /api/courses/:id/lessons',
      '5_enroll_student': 'POST /api/courses/:id/enroll'
    },
    
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// ================================
// RUTAS DE LA API
// ================================

console.log('🔗 [server] Configuring API routes...');

// Rutas principales con prefijo /api
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);  
app.use('/api/lessons', lessonsRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/comments', commentsRoutes);

console.log('✅ [server] API routes configured successfully');

// ================================
// ARCHIVOS ESTÁTICOS
// ================================

// Servir documentación estática (Postman collection)
app.use('/docs', express.static(path.join(__dirname, '..', 'docs'), {
  dotfiles: 'deny',
  index: false,
  redirect: false
}));

// Endpoint específico para obtener la colección de Postman
app.get('/api/postman-collection', (req, res) => {
  const postmanPath = path.join(__dirname, '..', 'docs', 'docs', 'postman-learning_platform.json');
  res.sendFile(postmanPath, (err) => {
    if (err) {
      console.error('❌ [server] Error serving Postman collection:', err.message);
      res.status(404).json({
        error: 'Not Found',
        message: 'Postman collection not found',
        suggestion: 'Check if docs/docs/postman-learning_platform.json exists'
      });
    }
  });
});

// ================================
// MANEJO DE ERRORES
// ================================

// Middleware para rutas no encontradas (404)
app.use('*', (req, res) => {
  console.log(`❌ [server] 404 - Route not found: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    suggestions: [
      'Check the API documentation at GET /',
      'Verify the HTTP method is correct',
      'Ensure the endpoint path is properly formatted',
      'Try GET /health to verify the server is running'
    ],
    available_endpoints: [
      'GET /',
      'GET /health',
      'GET|POST /api/users',
      'GET|POST|PUT|DELETE /api/courses',
      'GET|POST|PUT|DELETE /api/lessons', 
      'GET|POST|PATCH /api/enrollments',
      'GET|POST /api/comments'
    ]
  });
});

// Middleware global de manejo de errores
app.use((error, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.error(`❌ [server] Unhandled error [${errorId}]:`, {
    error: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Determinar el código de estado basado en el tipo de error
  let statusCode = error.statusCode || error.status || 500;
  
  // Errores específicos de Sequelize
  if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
  } else if (error.name === 'SequelizeDatabaseError') {
    statusCode = 500;
  }

  // Respuesta de error estructurada
  const isDevelopment = NODE_ENV === 'development';
  
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : error.name || 'Error',
    message: statusCode === 500 && !isDevelopment 
      ? 'Something went wrong on our end' 
      : error.message,
    errorId,
    timestamp,
    path: req.originalUrl,
    method: req.method,
    
    // Información adicional solo en desarrollo
    ...(isDevelopment && {
      details: {
        name: error.name,
        stack: error.stack,
        ...(error.errors && { validationErrors: error.errors }),
        ...(error.sql && { sql: error.sql })
      }
    }),
    
    // Sugerencias para errores comunes
    ...(statusCode === 400 && {
      suggestions: [
        'Check request body format and required fields',
        'Verify data types and value constraints',
        'Review API documentation for correct parameters'
      ]
    }),
    
    ...(statusCode === 404 && {
      suggestions: [
        'Check if the resource exists',
        'Verify the ID or slug is correct',
        'Review the endpoint URL'
      ]
    }),
    
    ...(statusCode === 409 && {
      suggestions: [
        'Resource already exists',
        'Check for duplicate values in unique fields',
        'Try updating instead of creating'
      ]
    })
  });
});

// ================================
// FUNCIÓN DE INICIALIZACIÓN
// ================================

const startServer = async () => {
  try {
    console.log('');
    console.log('⚙️ ================================================');
    console.log('⚙️ INITIALIZING MINI LEARNING PLATFORM API');
    console.log('⚙️ ================================================');
    console.log(`⚙️ Environment: ${NODE_ENV}`);
    console.log(`⚙️ Port: ${PORT}`);
    console.log(`⚙️ DB Sync Mode: ${process.env.DB_SYNC || 'none'}`);
    
    // Sincronizar base de datos
    console.log('');
    console.log('🔄 [server] Synchronizing database...');
    await syncDb();
    console.log('✅ [server] Database synchronized successfully');
    
    // Iniciar servidor HTTP
    const server = app.listen(PORT, () => {
      console.log('');
      console.log('🎉 ================================================');
      console.log('🎉 MINI LEARNING PLATFORM API STARTED SUCCESSFULLY');
      console.log('🎉 ================================================');
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`📊 Environment: ${NODE_ENV}`);
      console.log(`💾 Database: ${process.env.DB_NAME || 'mini_learning_platform'}`);
      console.log(`🔄 DB Sync: ${process.env.DB_SYNC || 'none'}`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      console.log('');
      console.log('📋 Quick Start URLs:');
      console.log(`   🏥 Health Check:     http://localhost:${PORT}/health`);
      console.log(`   📖 API Info:         http://localhost:${PORT}/`);
      console.log(`   👥 Users API:        http://localhost:${PORT}/api/users`);
      console.log(`   📚 Courses API:      http://localhost:${PORT}/api/courses`);
      console.log(`   📖 Lessons API:      http://localhost:${PORT}/api/lessons`);
      console.log(`   🎓 Enrollments API:  http://localhost:${PORT}/api/enrollments`);
      console.log(`   💬 Comments API:     http://localhost:${PORT}/api/comments`);
      console.log('');
      console.log('🔧 Development Commands:');
      console.log('   npm run dev        - Start with auto-reload');
      console.log('   npm run db:seed    - Populate test data');
      console.log('   npm test          - Run tests');
      console.log('');
      console.log('📚 Documentation:');
      console.log(`   📮 Postman Collection: http://localhost:${PORT}/docs/docs/postman-learning_platform.json`);
      console.log(`   📋 API Endpoints:      http://localhost:${PORT}/`);
      console.log('🎉 ================================================');
      console.log('');
    });

    // Configuración para cierre graceful
    const gracefulShutdown = (signal) => {
      console.log('');
      console.log(`⚠️ [server] Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('⚠️ [server] HTTP server closed');
        
        try {
          // Cerrar conexión a la base de datos
          await require('./db').close();
          console.log('⚠️ [server] Database connection closed');
        } catch (error) {
          console.error('❌ [server] Error closing database:', error.message);
        }
        
        console.log('✅ [server] Graceful shutdown completed');
        process.exit(0);
      });
      
      // Forzar cierre si toma más de 30 segundos
      setTimeout(() => {
        console.error('❌ [server] Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    // Configurar señales para cierre graceful
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // Manejo de errores no capturados
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ [server] Unhandled Promise Rejection:', reason);
      console.error('❌ [server] Promise:', promise);
    });
    
    process.on('uncaughtException', (error) => {
      console.error('❌ [server] Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    return server;
        
  } catch (error) {
    console.error('');
    console.error('❌ ================================================');
    console.error('❌ FAILED TO START MINI LEARNING PLATFORM API');
    console.error('❌ ================================================');
    console.error(`❌ [server] Startup error: ${error.message}`);
    console.error(`🔍 [server] Stack trace:`, error.stack);
    console.error('');
    console.error('💡 Common Solutions:');
    console.error('   1. Ensure MySQL server is running');
    console.error('   2. Check .env file configuration');
    console.error('   3. Verify database credentials and permissions');
    console.error('   4. Run: npm install');
    console.error('   5. Check if port is already in use');
    console.error('   6. Review database connection settings');
    console.error('❌ ================================================');
    console.error('');
    
    process.exit(1);
  }
};

// ================================
// EXPORTAR Y EJECUTAR
// ================================

// Solo inicializar si este archivo se ejecuta directamente
if (require.main === module) {
  startServer().catch(error => {
    console.error('❌ [server] Failed to start server:', error);
    process.exit(1);
  });
}

module.exports = { 
  app, 
  startServer 
};

console.log('✅ [server] Server module loaded successfully');