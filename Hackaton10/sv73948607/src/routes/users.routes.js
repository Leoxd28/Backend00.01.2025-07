const controller = require('../controllers/user.controller');

const express=require("express")
const UserRouter=express.Router()
UserRouter.post("/",controller.addUser)
UserRouter.get("/getUsers",controller.viewUser)



module.exports={UserRouter} 