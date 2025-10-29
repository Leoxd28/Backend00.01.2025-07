const metrics = {
  routes: {}
};

const metricsMiddleware = (req, res, next) => {
  const route = `${req.method} ${req.path}`;
  
  if (!metrics.routes[route]) {
    metrics.routes[route] = {
      count: 0,
      totalTime: 0,
      avgTime: 0
    };
  }
  
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.routes[route].count++;
    metrics.routes[route].totalTime += duration;
    metrics.routes[route].avgTime = metrics.routes[route].totalTime / metrics.routes[route].count;
  });
  
  next();
};

const getMetrics = () => metrics;

module.exports = metricsMiddleware;
module.exports.getMetrics = getMetrics;