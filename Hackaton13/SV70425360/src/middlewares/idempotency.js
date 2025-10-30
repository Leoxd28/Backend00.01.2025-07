// In-memory store (para demo)
const store = new Map();
// TTL opcional
const TTL_MS = 1000 * 60 * 60; // 1h
export function idempotency(req, res, next) {
  const key = req.header('Idempotency-Key');
  if (!key) return next(new Error('Idempotency-Key requerido'));
  const hit = store.get(key);
  if (hit && (Date.now() - hit.time) < TTL_MS) {
    return res.status(200).json(hit.response);
  }
  // Hook para guardar al enviar respuesta
  const json = res.json.bind(res);
  res.json = (body) => {
    store.set(key, { time: Date.now(), response: body });
    return json(body);
  };
  next();
}
