const express = require('express');
const router = express.Router();
const Personal = require('../models/Personal');

router.post('/', async (req, res) => {
  try {
    const nuevo = await Personal.create(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await Personal.find();
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Personal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  await Personal.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado correctamente' });
});

module.exports = router;
