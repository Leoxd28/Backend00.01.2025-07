export function errorHandler(err, req, res, next) { // eslint-disable-line
  const name = err?.name;
  if (name === 'SequelizeValidationError' || name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: err.errors?.map(e => e.message) ?? [err.message] });
  }
  if (name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'UNIQUE_CONSTRAINT', details: err.errors?.map(e => e.message) ?? [err.message] });
  }
  if (name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: 'DB_ERROR', details: [err.message] });
  }
  console.error(err);
  return res.status(500).json({ error: 'INTERNAL_ERROR' });
}

export const asyncH = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
