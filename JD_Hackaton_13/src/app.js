const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const conditionalLogger = require('./middlewares/conditionalLogger');
const metricsMiddleware = require('./middlewares/metrics');

const routes = require('./routes');

const app = express();

// Configurar helmet con opciones personalizadas para permitir Swagger
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors());
app.use(compression());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
});
app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares personalizados
app.use(logger);
app.use(conditionalLogger);
app.use(metricsMiddleware);

// Rutas principales
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Demo - Express Pro',
    version: '1.0.0',
    documentation: '/api/v1/swagger/docs'
  });
});

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'La ruta solicitada no existe'
  });
});

// Manejo de errores global
app.use(errorHandler);

module.exports = app;