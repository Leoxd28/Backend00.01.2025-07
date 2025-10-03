const express = require('express');
const alumnoRouter = express.Router();
const {ObjectId, ReturnDocument } = require('mongodb')

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

alumnoRouter.get('/:id', async(req,res)=>{
    const db = await getDB();
    let id = req.params.id;
    let registros = await db.collection('alumnos').find(
        { _id: new ObjectId(id) },
        {projection:{
            nombre: 1,
            apellido: 1
        }}
    ).toArray();
    res.status(200).send({data: registros});
})

alumnoRouter.put('/:id', async(req,res)=>{
    const db = await getDB();
    let id = req.params.id;
    let {nombre, apellido, nota} = req.body

    let registros = await db.collection('alumnos').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: {nombre, apellido,nota, updateAt: new Date()}},
        {returnDocument: 'after'}
    
    )
    res.status(200).send({data: registros.value});

})

alumnoRouter.delete('/:id', async(req,res)=>{
    const db = await getDB();
    let id = req.params.id;
   
    let registros = await db.collection('alumnos').deleteOne(
        { _id: new ObjectId(id) }
    )
    res.status(200).send({data: registros.value});

})

module.exports = { alumnoRouter }
