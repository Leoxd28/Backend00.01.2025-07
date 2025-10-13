const mongoose = require('../db');

const insumoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  costoUnitario: { type: Number, required: true },
  fechaCompra: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insumo', insumoSchema);
