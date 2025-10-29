const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const env = require('./config/env');
const { createSession } = require('./config/session');

const sessionRoutes = require('./routes/authSession.routes');
const jwtRoutes = require('./routes/authJwt.routes');
const privateRoutes = require('./routes/private.routes');

const app = express();

if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Seguridad y utilidades
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sesión con MongoStore
app.use(createSession());

// Rate limiters
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use('/api/', apiLimiter);
app.use('/session/login', loginLimiter);
app.use('/jwt/login', loginLimiter);

// Salud
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Rutas
app.use('/session', sessionRoutes);
app.use('/jwt', jwtRoutes);
// Montamos rutas privadas con paths absolutos dentro (incluye /private/profile y /admin/stats)
app.use('/', privateRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error('[error]', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Error' });
});

module.exports = app;