require("dotenv").config()
const app=require("./src/app")
const PORT=process.env.PORT||8000
const connectDB=require("./db.js")


connectDB()

require("./src/routes/auth.routes.js")(app)
require("./src/routes/user.routes.js")(app)

app.listen(PORT,()=>{
    console.log(`servidor inciadno enel puero ${PORT}`)
})