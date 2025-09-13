const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("Hola desde mi servidor express con nodejs")
})

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})