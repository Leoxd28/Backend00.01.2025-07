require("dotenv").config()
const app =require("./src/app")
const PORT=process.env.PORT||8000
const userRouter=require("./src/routes/users")
const orderRouter=require("./src/routes/orders")
const { recordRequest,recordError,getMetrics } = require("./src/middlewares/metrics")
const{swaggerUi,specs}=require("./swagger")

app.use((req,res,next)=>{
    recordRequest(req.path)
    next()
})
app.use("/api",userRouter)
app.use("/api",orderRouter)


/**
 *  @swagger
 * /api/metrics:
 *   get:
 *     summary: "Obtiene métricas del sistema"
 *     description: "Devuelve métricas en formato JSON."
 *     tags:
 *       - Métricas
 *     responses:
 *       200:
 *         description: "Métricas obtenidas correctamente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: "Error interno del servidor"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "No se pudieron obtener las métricas"
 */
app.get("/api/metrics",(req,res)=>{
    res.json(getMetrics())
})

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))

app.use((req,res,next)=>{
    recordError(req.path)
    res.status(404).send("ruta mala")
})    
app.use((err,req,res,next)=>{
    recordError(req.path)
    res.status(err.status||500).send(err.message||"error interno")
})        

app.listen(PORT,()=>{
    console.log(`servidor iniciando en el puerto $(PORT)`)
})