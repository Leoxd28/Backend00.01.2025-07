import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  unidad: { type: String, default: "kg" },
  costoUnitario: { type: Number, required: true },
});

export default mongoose.model("Insumo", insumoSchema);
