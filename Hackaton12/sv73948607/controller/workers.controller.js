const workers=require("../models/workers")
const product=require("../models/products")

exports.create= async (req,res)=>{
    try{
        const neworker=await workers.create(req.body)
        res.status(201).json(neworker)
    }catch(error){
        res.status(500).send("error")
    }
}

exports.anotherworker=async(req,res)=>{
    try {
        const products= await product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})         
        res.status(201).json(products)
    } catch (error) {
        res.satus(401).send("error")
    }
}