const store = new Map();

module.exports = function idempotency(req, res, next) {
  const key = req.headers["idempotency-key"];
  if (!key)
    return res.status(400).json({ error: "Idempotency-Key header required" });

  const entry = store.get(key);
  if (entry) {
    try {
      if (entry.headers) res.set(entry.headers);
    } catch (e) {}
    return res.status(entry.status).json({ ...entry.body, replay: true });
  }

  const originalJson = res.json.bind(res);
  const originalStatus = res.status.bind(res);
  let responseStatus = 200;

  res.status = function (code) {
    responseStatus = code;
    return originalStatus(code);
  };

  res.json = function (payload) {
    try {
      const headers = {};
      store.set(key, {
        status: responseStatus,
        body: payload,
        headers,
        ts: Date.now(),
      });
    } catch (e) {
      console.error("[idempotency] store error", e);
    }
    return originalJson(payload);
  };

  next();
};
