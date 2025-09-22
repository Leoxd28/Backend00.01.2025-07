const validateNombre = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "El campo 'name' es obligatorio" });
  }
  next();
};
module.exports = validateNombre;