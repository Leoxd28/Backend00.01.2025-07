const express = require('express');
const router = express.Router();
const MateriaPrima = require('../models/MateriaPrima');

// Crear
router.post('/', async (req, res) => {
  try {
    const nueva = await MateriaPrima.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leer todo
router.get('/', async (req, res) => {
  const data = await MateriaPrima.find();
  res.json(data);
});

// Actualizar
router.put('/:id', async (req, res) => {
  const actualizado = await MateriaPrima.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar
router.delete('/:id', async (req, res) => {
  await MateriaPrima.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado correctamente' });
});

module.exports = router;
