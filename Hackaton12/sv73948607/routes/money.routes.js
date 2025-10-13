const express=require("express")
const moneyRouter=express.Router()
const controller=require("../controller/money.controller")

moneyRouter.post("/create",controller.create)

module.exports={moneyRouter}