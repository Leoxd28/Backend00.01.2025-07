import mongoose from 'mongoose';
const ITEM_TYPES = ['materia_prima', 'insumo', 'producto'];
const UNITS = ['tablón', 'kg', 'unidad', 'hh'];

const ItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  tipo: { type: String, enum: ITEM_TYPES, required: true },
  unidad: { type: String, enum: UNITS, required: true },
  stock: { type: Number, default: 0 },
  costo_promedio: { type: Number, default: 0 },
}, { timestamps: true });

export const Item = mongoose.model('Item', ItemSchema);
