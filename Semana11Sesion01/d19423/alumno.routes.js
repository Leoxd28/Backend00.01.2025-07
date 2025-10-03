const express = require('express');
const alumnoRouter = express.Router();

const {db,getDB,closeDB} = require( "./db");


alumnoRouter.post('/', async(req,res)=>{
    const db = await getDB();
    console.log(db)
    const doc = {...req.body, createAt: new Date()};
    const r = db.collection('alumnos').insertOne(doc);
    res.status(201).send({_id: r.insertedId, ...doc});
})

module.exports = {alumnoRouter}
