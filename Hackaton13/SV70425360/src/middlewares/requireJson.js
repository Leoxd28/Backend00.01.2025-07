export function requireJson(req, res, next) {
  if (['POST','PUT','PATCH'].includes(req.method)) {
    const ct = req.headers['content-type'] || '';
    if (!ct.includes('application/json')) {
      return next(new Error('Content-Type debe ser application/json'));
    }
  }
  next();
}
