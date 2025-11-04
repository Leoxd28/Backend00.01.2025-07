import express from 'express';
import comprasRoutes from './routes/compras.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import produccionRoutes from './routes/produccion.routes.js';
import rrhhRoutes from './routes/rrhh.routes.js';
import analiticaRoutes from './routes/analitica.routes.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/compras', comprasRoutes);
  app.use('/api/inventario', inventarioRoutes);
  app.use('/api/produccion', produccionRoutes);
  app.use('/api/rrhh', rrhhRoutes);
  app.use('/api/analitica', analiticaRoutes);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(400).json({ error: err.message || 'Error' });
  });

  return app;
}
