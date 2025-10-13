const express=require("express")
const recourseRouter=express.Router()
const controller=require("../controller/recourse.controller")

recourseRouter.post("/create",controller.create)
recourseRouter.post("/add/:id",controller.add)

module.exports={recourseRouter}