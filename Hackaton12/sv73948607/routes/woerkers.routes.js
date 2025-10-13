const express =require("express")
const workersRouter=express.Router()
const controller=require("../controller/workers.controller")

workersRouter.post("/create",controller.create)
workersRouter.put("/other/:id",controller.anotherworker)

module.exports={workersRouter}