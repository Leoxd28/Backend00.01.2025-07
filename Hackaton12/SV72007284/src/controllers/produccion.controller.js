const Produccion = require("../models/produccion.model");

const getProducciones = async (req, res, next) => {
  try {
    const producciones = await Produccion.find();
    res.json(producciones);
  } catch (error) {
    next(error);
  }
};

const postProduccion = async (req, res, next) => {
  try {
    const nueva = new Produccion(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducciones,
  postProduccion,
};
