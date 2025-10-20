const cache = new Map(); 

module.exports = (req, res, next) => {
  const key = req.header('Idempotency-Key');
  if (!key) return next();

  if (cache.has(key)) {
    console.log(`♻️ Respuesta idempotente reutilizada para clave ${key}`);
    return res.status(200).json(cache.get(key));
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, body);
    originalJson(body);
  };
  next();
};
