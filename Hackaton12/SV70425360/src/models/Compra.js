import mongoose from 'mongoose';
const CompraLineaSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  cantidad: { type: Number, required: true, min: 0 },
  costo_unitario: { type: Number, required: true, min: 0 },
});

const CompraSchema = new mongoose.Schema({
  proveedor: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  lineas: { type: [CompraLineaSchema], validate: v => v.length > 0 },
  total: { type: Number, default: 0 },
});

CompraSchema.pre('save', function(next) {
  this.total = this.lineas.reduce((acc, l) => acc + l.cantidad * l.costo_unitario, 0);
  next();
});

export const Compra = mongoose.model('Compra', CompraSchema);
