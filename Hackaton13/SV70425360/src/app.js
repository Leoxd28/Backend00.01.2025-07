import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { logger } from './middlewares/logger.js';
import { requireJson } from './middlewares/requireJson.js';
import { errorHandler } from './middlewares/error.handler.js';
import { apiLimiter } from './middlewares/rate.limit.js';
import { requireApiKey } from './middlewares/auth.apikey.js';
import { collectMetrics, metrics as metricsStore } from './middlewares/metrics.js';
import usersV1 from './routes/v1/users.routes.js';
import ordersV1 from './routes/v1/orders.routes.js';
import uploadsV1 from './routes/v1/uploads.routes.js';
import paymentsV1 from './routes/v1/payments.routes.js';
import { setupSwagger } from './utils/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // Global
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(logger);
  app.use(apiLimiter);
  app.use(collectMetrics);

  app.use(express.json({ limit: '1mb' }));
  app.use(requireJson);

  // Static for uploads
  app.use('/uploads', express.static(path.join(__dirname, '..', env.UPLOAD_DIR)));

  // Health + data
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.post('/api/data', (req, res) => res.json({ received: true, body: req.body || null }));

  // Versioned routes
  app.use('/api/v1/users', usersV1);
  app.use('/api/v1/orders', ordersV1);
  app.use('/api/v1/uploads', uploadsV1);
  app.use('/api/v1/payments', paymentsV1);

  // Metrics (no auth) y también con API Key opcional
  app.get('/api/metrics', (_req, res) => {
    const out = Object.entries(metricsStore.perRoute).map(([k, v]) => ({
      route: k, count: v.count, avgMs: (v.totalMs / v.count).toFixed(2)
    }));
    res.json({ requests: metricsStore.requests, routes: out });
  });

  // Swagger
  setupSwagger(app);

  // Bonus: API Key auth example route
  app.get('/api/secure', requireApiKey, (_req, res) => res.json({ ok: true }));

  // SSE
  app.get('/api/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders?.();
    for (let i=1;i<=5;i++) {
      res.write(`data: ${JSON.stringify({ tick: i })}\n\n`);
      await new Promise(r => setTimeout(r, 1000));
    }
    res.end();
  });

  // Error handler
  app.use(errorHandler);

  return app;
}
