const mongoose = require('../db');

const personalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cargo: { type: String, required: true },
  horasTrabajadas: { type: Number, default: 0 },
  salarioHora: { type: Number, required: true }
});

module.exports = mongoose.model('Personal', personalSchema);
