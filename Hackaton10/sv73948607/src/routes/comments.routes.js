const express=require("express")
const commentsRouter=express.Router()
const controller=require("../controllers/comments.controllers")

commentsRouter.post("/:idc/add",controller.addcomment)
commentsRouter.get("/:id/view",controller.viewcomment)
module.exports={commentsRouter}
