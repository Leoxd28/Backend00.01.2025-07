import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horasDisponibles: { type: Number, required: true },
  costoHora: { type: Number, required: true },
});

export default mongoose.model("Personal", personalSchema);
