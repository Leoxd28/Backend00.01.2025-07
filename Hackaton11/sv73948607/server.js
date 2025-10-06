const express =require("express")
require("dotenv").config()
const db=require("./db")
const { routeRouter } = require("./routes/route")

const app=express()
app.use(express.json())
app.use("/route",routeRouter)


const PORT=process.env.PORT|| 8050

app.listen(PORT,()=>{console.log(`escuchadno en elpuerto${PORT}$`)})