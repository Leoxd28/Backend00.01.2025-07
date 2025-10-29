const cookieSession = require("cookie-session")
const express =require("express")
const rateLimit=require("express-rate-limit")
const limiter=rateLimit({windowMs:60_000,max:100})
const helmet=require("helmet")
const compression=require("compression")
const morgan=require("morgan")


const app =express()




app.use(morgan("dev"))
app.use(compression())
app.use(helmet())
app.use(express.json({limit:"2000kb"}))
app.use(express.urlencoded({entended:true}))

app.use("/api",limiter)
app.use(
    cookieSession({
        name:"auth-session",
        keys:[process.env.COOKIE_SECRET],
        httpOnly:true
    })
)


module.exports=app