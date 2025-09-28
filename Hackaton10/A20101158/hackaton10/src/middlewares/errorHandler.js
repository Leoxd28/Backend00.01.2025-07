module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Duplicado: ' + err.errors[0].message });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
};
