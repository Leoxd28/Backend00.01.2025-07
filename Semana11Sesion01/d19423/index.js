require('dotenv').config();
const express =  require('express');
const  { getDB } =require('./db');

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).send({message:"Todo listo"})
})

const PORT = process.env.PORT || 8050;

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})