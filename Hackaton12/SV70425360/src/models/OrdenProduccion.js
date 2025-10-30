import mongoose from 'mongoose';
const OrdenProduccionSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  cantidad_plan: { type: Number, required: true, min: 1 },
  estado: { type: String, enum: ['planificada', 'en_proceso', 'terminada'], default: 'planificada' },
  bom: {
    tablon: { type: Number, default: 1 },
    gomaKg: { type: Number, default: 0.25 },
    hh: { type: Number, default: 8 },
  },
  consumo: {
    tablones: { type: Number, default: 0 },
    gomaKg: { type: Number, default: 0 },
    horas: { type: Number, default: 0 },
  }
}, { timestamps: true });

export const OrdenProduccion = mongoose.model('OrdenProduccion', OrdenProduccionSchema);
