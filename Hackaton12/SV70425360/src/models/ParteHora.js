import mongoose from 'mongoose';
const ParteHoraSchema = new mongoose.Schema({
  empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fecha: { type: Date, default: Date.now },
  horas: { type: Number, required: true, min: 0 },
  produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'OrdenProduccion' },
});

export const ParteHora = mongoose.model('ParteHora', ParteHoraSchema);
