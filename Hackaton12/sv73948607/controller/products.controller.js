const product=require("../models/products")
const recourse=require("../models/recourse")
const inputs = require("../models/inputs")
const money = require("../models/money")
const workers = require("../models/workers")

exports.create= async (req,res)=>{
    try {
        const newproduct=await product.create(req.body)
        res.status(201).json(newproduct)
    } catch (error) {
        res.status(500).send("error")
    }
}

exports.makeproduct=async(req,res)=>{
    try{
     const makeproduct=await product.findById(req.params.id)
        if(!makeproduct){
            return res.status(404).send("producto invalido")
         }
    for (const r of makeproduct.recourse) {
       const recource = await recourse.findOne({name:r.name})
       const inputss = await inputs.findOne({name:r.name}) 
       if(!recource&&!inputss){
        return res.status(404).send(`recurso ${r.name} no encontrado`) 
        } 
       
        const item=recource || inputss

        if(item.count<r.amount){
          return res.status(404).send(`No hay sudficiente ${r.name}`)
        }
    }
    
    for(const r of makeproduct.recourse){
        const recource = await recourse.findOne({name:r.name})
        if(recource){
        recource.count-=r.amount
        await recource.save()
     }   
    }

    const worker= await workers.findById(makeproduct.workers)
    if(!worker) 
        {return res.status(401).send("noexiste ese trabajor")} 
    if(worker.hour<makeproduct.time){
        return res.status(401).send("horas insuficientes")         
    }

     worker.hour-=makeproduct.time
     await worker.save()

     const workgroup=await workers.find()
     for (const r of workgroup) {
        r.hour+=1
        await r.save()   
     }

    
    for(const r of makeproduct.recourse){
        const inputss=await inputs.findOne({name:r.name})
       if(inputss){
        inputss.count-=r.amount
       await inputss.save()
       }
    }

    
    if(!makeproduct.stock){
       makeproduct.stock=0 
    }
    makeproduct.stock+=1
    await makeproduct.save()
    
    return res.status(200).send(`producto ${makeproduct.name} fabricada correctamente`)
    
    }catch(error){
      res.status(500).send("error de codig p")
    }
}


exports.sell=async (req,res)=>{
    try{ const products=await product.findById(req.params.id)
      const moneys=await money.findById("68eaf604ae202e460c3f95b0")
    
     moneys.count+=products.price*products.stock
      await moneys.save()

     products.stock=0
     await products.save()

      res.status(202).send(`se vendio con exito la cantidad de dinero actual es ${moneys.count}`)
    }
    catch(error){
        res.status(500).send("error de codigo ")
    }    
     } 