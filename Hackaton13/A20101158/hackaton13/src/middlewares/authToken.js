module.exports = function (req, res, next) {
  const token = req.header('x-token');
  if (!token) return res.status(401).json({ error: 'Acceso denegado. Falta x-token.' });

  if (token !== '12345') return res.status(403).json({ error: 'Token inválido' });

  next();
};
