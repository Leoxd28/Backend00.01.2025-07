module.exports = function (req, res, next) {
  if (!req.body.nombre || req.body.nombre.trim() === '') {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }
  next();
};