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

app.get('/buscar',(req,res)=>{
    let nombre = req.query.nombre
    let alumno = alumnos.find(a=> a.nombre == nombre);
    if(!alumno){
        return res.status(404).json({error: `No existe el alumno con el id ${req.params.id}`})
    }
    res.json(alumno);
})

app.post('/alumno',(req,res)=>{
    const nuevo = {id: alumnos.length+1, nombre: req.body.nombre};
    alumnos.push(nuevo);
    res.status(201).json(nuevo)
})

app.put('/alumno/:id',(req,res)=>{
    let alumno = alumnos.find(a=> a.id == req.params.id);
    if(!alumno){
        return res.status(404).json({error: `No existe el alumno con el id ${req.params.id}`})
    }
    const index = alumnos.indexOf(alumno);
    if (index > -1) { // only splice array when item is found
        alumnos[index].nombre = req.body.nombre;
    }
    res.status(200).json(alumno);
})

app.get("/privado",auth, (req,res)=>{
    res.json({message:"Bienvenido al club privado"})
})

app.delete('/alumno/:id',(req,res)=>{
    let alumno = alumnos.find(a=> a.id == req.params.id);
    if(!alumno){
        return res.status(404).json({error: `No existe el alumno con el id ${req.params.id}`})
    }
    const index = alumnos.indexOf(alumno);
    if (index > -1) { // only splice array when item is found
         alumnos.splice(index, 1);
    }
    res.status(200).json({mensaje: `Se elimino el alumno ${req.params.id}`});
})


app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})

function auth(req, res, next){
    if(req.headers.token === "12345"){
        next();
    }
    else{
        res.status(403).json({error: "No estas autorizado"})
    }
}