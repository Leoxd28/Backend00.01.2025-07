const express =require("express")
const  productRouter=express.Router()
const controller=require("../controller/products.controller")

productRouter.post("/create",controller.create)
productRouter.post("/makeproduct/:id",controller.makeproduct)
productRouter.post("/sell/:id",controller.sell)

module.exports={productRouter}