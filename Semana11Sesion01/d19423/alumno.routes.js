const express = require('express');
const alumnoRouter = express.Router();

const { db, getDB, closeDB } = require("./db");


alumnoRouter.post('/', async (req, res) => {
    try {
        const db = await getDB();
        console.log(db)
        const data = req.body;
        let doc;
        if (Array.isArray(data)) {
            db.collection('alumnos').insertMany(data);
        }
        else {
            db.collection('alumnos').insertOne(doc);
        }

        res.status(201).send({ message: 'Ejecutado Correctamente' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
})

alumnoRouter.get('/', async(req,res)=>{
    const db = await getDB();
    let registros = await db.collection('alumnos').find().toArray();
    res.status(200).send({data: registros});
})

module.exports = { alumnoRouter }
