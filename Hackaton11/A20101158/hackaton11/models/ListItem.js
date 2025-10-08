const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date, default: Date.now },
  esCompletado: { type: Boolean, default: false }
});

module.exports = mongoose.model('ListItem', listItemSchema);
