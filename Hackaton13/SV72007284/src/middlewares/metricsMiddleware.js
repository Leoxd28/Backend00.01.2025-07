const metrics = {
  startedAt: Date.now(),
  requests: 0,
  endpoints: {},
};

function metricsMiddleware(req, res, next) {
  metrics.requests++;
  const route = (req.baseUrl || "") + (req.path || "");
  metrics.endpoints[route] = (metrics.endpoints[route] || 0) + 1;
  req.appMetrics = metrics;
  next();
}

module.exports = { metricsMiddleware, metrics };
