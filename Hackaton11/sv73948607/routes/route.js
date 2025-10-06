const express= require("express")
const routeRouter=express.Router()
const controller =require("../controller/route.controller")

routeRouter.post("/listadd",controller.makelist)
routeRouter.get("/get",controller.search)
routeRouter.post("/addproducts",controller.addproducts)
routeRouter.put("/updateproducts",controller.updateproducts)
module.exports={routeRouter}