const mongoose = require("mongoose");

const produccionSchema = new mongoose.Schema({
  nombreProducto: { type: String, default: "Armario" },
  materiaPrimaUsada: { type: Number, default: 1 },
  insumoUsado: { type: Number, default: 0.25 },
  horasHombre: { type: Number, default: 8 },
  fechaProduccion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Produccion", produccionSchema);
