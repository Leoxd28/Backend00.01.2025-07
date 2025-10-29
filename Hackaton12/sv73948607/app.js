
const express =require("express")
const morgan =require("morgan")
const connectDB=require("./db")
const {productRouter}=require("./routes/products.routes")
const {workersRouter}=require("./routes/woerkers.routes")
const {recourseRouter}=require("./routes/recourse.routes")
const {moneyRouter}=require("./routes/money.routes")
const {inputsRouter}=require("./routes/inputs.route")

const app = express()   
app.use(express.json())
app.use(morgan("dev"))
app.use("/product",productRouter)
app.use("/workers",workersRouter)
app.use("/recourse",recourseRouter)
app.use("/money",moneyRouter)
app.use("/inputs",inputsRouter)

const PORT=process.env.PORT || 3000
connectDB().then(()=>app.listen(PORT,()=>console.log(`pi en el puerto ${PORT}`)))