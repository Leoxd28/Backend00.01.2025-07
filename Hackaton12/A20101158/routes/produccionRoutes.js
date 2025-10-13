const express = require('express');
const router = express.Router();
const Produccion = require('../models/Produccion');

router.post('/', async (req, res) => {
  try {
    const nuevo = await Produccion.create(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await Produccion.find();
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Produccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  await Produccion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado correctamente' });
});

module.exports = router;
