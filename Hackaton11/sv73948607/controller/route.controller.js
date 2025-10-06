const {db,getDB,closeD}=require("../db")
const{ObjectId,ReturnDocument}=require("mongodb")

exports.makelist=async (req,res)=>{
try {
    const db= await getDB()
    const data=req.body
    if(Array.isArray(data)){
        const docs =data.map(item=>({...item,createdAt:new Date(),productos:[]}))
        await db.collection("listas").insertMany(docs)
        res.status(201).send(docs)    
    }else{
        data.createdAt=new Date()
        data.productos=[]
        const datacomp=await db.collection("listas").insertOne(data)
        res.status(201).send({datacomp})
    }    
    } catch (error) {
    res.status(404).send(error)
    
}
}   

exports.search=async(req,res)=>{
try {
    const db=await getDB()
    const activate=req.query.q
    let data = await db.collection("listas").find({completado:activate},{projection:{nombre:1,descripcion:1,completado:1,createdAt:1}}).toArray()
     res.status(201).send({data})
} catch (error) {
    res.status(404).send(error)
    }
        
}

exports.addproducts=async(req,res)=>{
const idlist = req.query.id
const  objc = req.body.objc
const status=req.body.status
    try { 
     const db=await getDB()
     let data=await db.collection("listas").findOneAndUpdate({_id:new ObjectId(idlist)},{$push:{productos:{objc,status}}},{returnDocument:"after"})
      res.status(201).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.updateproducts=async(req,res)=>{
      const idlist=req.query.id
      const producto=req.body.objc
      const status=req.body.status
    try {
        const db=await getDB()
        let data = await db.collection("listas").updateOne({_id:new ObjectId(idlist)},{$set:{"productos.$[elem].status":status}},{arrayFilters:[{"elem.objc":producto}],returnDocument:"after"}  )    
        const lista =await db.collection("listas").findOne({_id:new ObjectId(idlist)})  
        const allcomplete =lista.productos.every(p=>p.status==="completado")
        const nuevoestado=allcomplete?"completado":"sin completar"
        if (lista.completado!==nuevoestado) {
        await db.collection("listas").updateOne(   
         {_id:new ObjectId(idlist)},
           {$set:{completado:nuevoestado}}
        )}
        const listafinal=await db.collection("listas").findOne({_id:new ObjectId(idlist)})

        res.status(201).send(listafinal)    
    } catch (error) {
        res.status(401).send(error)
    }
}