const { getDB } = require("./db");
const { ObjectId } = require("mongodb");
const { validarItem } = require("../models/lista.js");

async function crearItem(req, res) {
  try {
    const { nombre, descripcion, fecha } = req.body;

    const nuevoItem = validarItem({ nombre, descripcion, fecha });

    const db = await getDB();
    const result = await db.collection("lista").insertOne(nuevoItem);

    res.status(201).json({ ok: true, data: result });
  } catch (err) {
    res.status(400).json({ ok: false, msg: err.message });
  }
}

async function obtenerPendientes(req, res) {
  try {
    const db = await getDB();
    const items = await db.collection("lista").find({ esCompletado: false }).toArray();
    res.json({ ok: true, data: items });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
}

async function obtenerCompletados(req, res) {
  try {
    const db = await getDB();
    const items = await db.collection("lista").find({ esCompletado: true }).toArray();
    res.json({ ok: true, data: items });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
}

async function completarItem(req, res) {
  try {
    const db = await getDB();
    const { id } = req.params;

    const result = await db.collection("lista").updateOne(
      { _id: new ObjectId(id) },
      { $set: { esCompletado: true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ ok: false, msg: "Item no encontrado" });
    }

    res.json({ ok: true, msg: "Item completado correctamente" });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
}

module.exports = {
  crearItem,
  obtenerPendientes,
  obtenerCompletados,
  completarItem,
};
