const inputs =require("../models/inputs")
const money=require("../models/money")

exports.create= async(req,res)=>{
try{
     const newinputs= await inputs.create(req.body)
    res.status(201).json(newinputs)
}
catch(error){
 res.status(500).send("error")
}
}

exports.add=async(req,res)=>{
 const add =Number(req.body.add)
    try {
        const inputss =await inputs.findById(req.params.id) 
        const moneys=await money.findById("68eaf604ae202e460c3f95b0")

       inputss.count+=add
       inputss.save() 

       moneys.count-=add*inputss.price
     await moneys.save()

    res.status(201).send({inputss,dineroactual:moneys.count})
    } catch (error) {
        
    }
}