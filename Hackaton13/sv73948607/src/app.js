const express=require("express")
const morgan =require("morgan")
const helmet=require("helmet")
const compression=require("compression")
const cors =require("cors")




const app =express()

app.use(express.json({limit:"200kb"}))
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(cors({origin:process.env.ORIGINS,methods:["GET","POST"]}))

module.exports=app