import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  descripcion: { type: String, required: true, trim: true, minlength: 3, maxlength: 2000 },
  fecha: { type: Date, required: true }, // fecha objetivo
  esCompletado: { type: Boolean, default: false, index: true },
  completedAt: { type: Date } // se setea al completar
}, { timestamps: true });

// Hook: si se marca completado y no hay completedAt, setear ahora
TodoSchema.pre('save', function(next) {
  if (this.isModified('esCompletado') && this.esCompletado && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

export default mongoose.model('Todo', TodoSchema);
