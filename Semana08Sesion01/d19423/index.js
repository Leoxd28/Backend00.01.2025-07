const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 8001;

let alumnos = [
    {
        id:1, 
        nombre:"Roberto"
    },
    {
        id:2,
        nombre:"David"
    }
]

app.get('/',(req,res)=>{
    res.send("Hola desde mi api")
})

app.get('/alumno',(req,res)=>{
    res.send(alumnos)
})

app.get('/alumno/:id',(req,res)=>{
    let alumno = alumnos.find(a=> a.id == req.params.id);
    if(!alumno){
        return res.status(404).json({error: `No existe el alumno con el id ${req.params.id}`})
    }
    res.json(alumno);
})

app.post('/',(req,res)=>{
    res.send("Hola desde el post")
})

app.put('/',(req,res)=>{
    res.send("Hola desde el put")
})

app.patch('/',(req,res)=>{
    res.send("Hola desde el patch")
})

app.delete('/',(req,res)=>{
    res.send("Hola desde el delete")
})


app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})