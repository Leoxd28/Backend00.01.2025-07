const money =require("../models/money")

exports.create= async (req,res)=>{
    try{
    const newmoney= await money.create(req.body)
    res.status(201).json(newmoney)
    }
    catch(error){
        res.status(500).send("error")
    }
}