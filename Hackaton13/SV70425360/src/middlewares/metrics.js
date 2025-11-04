// Métricas simples por ruta y método
export const metrics = {
  requests: 0,
  perRoute: {} // { 'GET /api/health': { count, totalMs } }
};
export function collectMetrics(req, res, next) {
  const start = process.hrtime.bigint();
  metrics.requests++;
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;
    const key = `${req.method} ${req.route ? (req.baseUrl + req.route.path) : req.originalUrl}`;
    const m = metrics.perRoute[key] || { count: 0, totalMs: 0 };
    m.count += 1; m.totalMs += ms;
    metrics.perRoute[key] = m;
  });
  next();
}
