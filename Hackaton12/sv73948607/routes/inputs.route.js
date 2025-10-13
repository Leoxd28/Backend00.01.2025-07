const express=require("express")
const inputsRouter=express.Router()
const controller=require("../controller/inputs.controller")

inputsRouter.post("/create",controller.create)
inputsRouter.post("/add/:id",controller.add)

module.exports={inputsRouter}