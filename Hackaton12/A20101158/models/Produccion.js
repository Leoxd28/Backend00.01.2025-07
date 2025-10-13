const mongoose = require('../db');

const produccionSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  cantidadArmarios: { type: Number, required: true },
  recursos: {
    tablones: { type: Number, required: true },
    gomaKg: { type: Number, required: true },
    horasHombre: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Produccion', produccionSchema);
