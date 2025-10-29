import Produccion from "../models/produccion.model.js";

export const crearProduccion = async (data) => {
  const produccion = new Produccion(data);
  return await produccion.save();
};

export const listarProducciones = async () => {
  return await Produccion.find();
};
