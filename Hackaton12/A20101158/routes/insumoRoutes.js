const express = require('express');
const router = express.Router();
const Insumo = require('../models/Insumo');

router.post('/', async (req, res) => {
  try {
    const nuevo = await Insumo.create(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await Insumo.find();
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Insumo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  await Insumo.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado correctamente' });
});

module.exports = router;
