import mongoose from "mongoose";

const materiaPrimaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  unidad: { type: String, default: "tablon" },
  costoUnitario: { type: Number, required: true },
});

export default mongoose.model("MateriaPrima", materiaPrimaSchema);
