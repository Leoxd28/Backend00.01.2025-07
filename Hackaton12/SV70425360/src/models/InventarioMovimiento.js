import mongoose from 'mongoose';
const InventarioMovimientoSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  tipo: { type: String, enum: ['COMPRA', 'CONSUMO'], required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  cantidad: { type: Number, required: true },
  costo_unitario: { type: Number, default: 0 },
  ref_doc: { type: String },
}, { timestamps: true });

export const InventarioMovimiento = mongoose.model('InventarioMovimiento', InventarioMovimientoSchema);
