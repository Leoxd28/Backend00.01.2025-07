const express = require("express");
const { getDB } = require("../config/db.js");
const { ObjectId } = require("mongodb");

const listaRouter = express.Router();

listaRouter.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, fecha } = req.body;
    const db = await getDB();
    const result = await db.collection("lista").insertOne({
      nombre,
      descripcion,
      fecha: fecha ? new Date(fecha) : new Date(),
      esCompletado: false,
    });
    res.status(201).json({ ok: true, data: result });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

listaRouter.get("/pendientes", async (req, res) => {
  try {
    const db = await getDB();
    const items = await db.collection("lista").find({ esCompletado: false }).toArray();
    res.json({ ok: true, data: items });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

listaRouter.get("/completados", async (req, res) => {
  try {
    const db = await getDB();
    const items = await db.collection("lista").find({ esCompletado: true }).toArray();
    res.json({ ok: true, data: items });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

listaRouter.put("/completar/:id", async (req, res) => {
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
});

module.exports = { listaRouter };
