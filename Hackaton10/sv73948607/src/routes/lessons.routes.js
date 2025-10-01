const controller=require("../controllers/lessons.controllers")
const express=require("express")
const lessonsRouter=express.Router()

lessonsRouter.post("/:id/newlesson",controller.createlessons)
lessonsRouter.get("/:id/viewlesson",controller.viewlessons)
lessonsRouter.put("/:idc/put/:idl",controller.updatelesson)
lessonsRouter.delete("/:id/delete",controller.deletelesson)
module.exports={lessonsRouter}