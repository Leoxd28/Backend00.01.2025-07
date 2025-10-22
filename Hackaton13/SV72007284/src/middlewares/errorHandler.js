module.exports = function errorHandler(err, req, res, next) {
  console.error("[errorHandler]", err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
};
