const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("./db");

const listaRouter = express.Router();

//Crear un item en la lista
listaRouter.post("/", async (req, res) => {
  try {
    const db = await getDB();
    const collection = db.collection("lista_compras");

    const { nombre, descripcion, fecha } = req.body;
    const nuevoItem = { nombre, descripcion, fecha, esCompletado: false };

    await collection.insertOne(nuevoItem);
    res.status(201).json({ message: "Item creado", item: nuevoItem });
  } catch (error) {
    res.status(500).json({ message: "Error al crear item", error: error.message });
  }
});

//Mostrar los pendientes
listaRouter.get("/pendientes", async (req, res) => {
  try {
    const db = await getDB();
    const collection = db.collection("lista_compras");
    const pendientes = await collection.find({ esCompletado: false }).toArray();
    res.json(pendientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pendientes", error: error.message });
  }
});

//Mostrar los completados
listaRouter.get("/completados", async (req, res) => {
  try {
    const db = await getDB();
    const collection = db.collection("lista_compras");
    const completados = await collection.find({ esCompletado: true }).toArray();
    res.json(completados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener completados", error: error.message });
  }
});

//Marcar un item como completado
listaRouter.put("/:id/completar", async (req, res) => {
  try {
    const db = await getDB();
    const collection = db.collection("lista_compras");

    const id = new ObjectId(req.params.id);
    await collection.updateOne({ _id: id }, { $set: { esCompletado: true } });

    res.json({ message: "Item completado ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error al completar item", error: error.message });
  }
});

module.exports = { listaRouter };
