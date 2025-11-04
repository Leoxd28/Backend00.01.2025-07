import mongoose from 'mongoose';
const EmpleadoSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  tarifa_hora: { type: Number, required: true, min: 0 },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

export const Empleado = mongoose.model('Empleado', EmpleadoSchema);
