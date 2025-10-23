const ListItem = require('../models/ListItem');

// Crear item
exports.crearItem = async (req, res) => {
  try {
    const nuevoItem = new ListItem(req.body);
    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mostrar pendientes
exports.obtenerPendientes = async (req, res) => {
  const items = await ListItem.find({ esCompletado: false });
  res.json(items);
};

// Mostrar completados
exports.obtenerCompletados = async (req, res) => {
  const items = await ListItem.find({ esCompletado: true });
  res.json(items);
};

// Marcar como completado
exports.completarItem = async (req, res) => {
  try {
    const item = await ListItem.findByIdAndUpdate(
      req.params.id,
      { esCompletado: true },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: 'Item no encontrado' });
  }
};
