const{Op, where}=require("sequelize")
const db =require("../models")
const course=db.course
const User=db.User


exports.addCourse=async(req,res)=>{
let = req.body
const cursonuevo={
    title :req.body.title,
    slug : req.body.slug,
    description :req.body.description,
    published:req.body.published,
    creatorId:req.userId
}
course.create(cursonuevo).then(data=>{
    res.status(201).send(data)
}).catch(error=>res.status(404).send({message:error})
)
}

    exports.searchCourse=async(req,res)=>{
     const orderParam = req.query.order||""
    const publi =req.query.publi
    let page=parseInt(req.query.page)
    let size=parseInt(req.query.size)
    let inicio=(page-1)*size
    let final=page*size
    const where={}
    try {
    if (publi === "true") where.published = true;
    else if (publi === "false") where.published = false;
    
    let data = await course.findAll({where})
    if (orderParam) {
        const [field, dir] = orderParam.split(":");
        data.sort((a, b) => {
            if (a[field] < b[field]) return dir.toUpperCase() === "DESC" ? 1 : -1;
            if (a[field] > b[field]) return dir.toUpperCase() === "DESC" ? -1 : 1;
            return 0;
        });
    } 

    if(page>0||size>0){
        let datafin=data.slice(inicio,final)
        res.status(200).send(datafin)
    }else{
        res.status(200).send(data)
    }
    } catch (error) {
        res.status(404).send({message:error})
    }    
}

exports.getslug=async(req,res)=>{
    const data= await course.findAll({include:{model:User,attributes:["firstName","lastName","email"]}})
   

    res.status(200).send(data)
}

exports.update=async(req,res)=>{
    const courseId=req.params.id
    const updates=req.body

    try {
        const courseupdate=await course.findByPk(courseId)
        if(!courseupdate){
            return res.status(404).json({message:"curso no encontrado"})             
    }   
    
    await courseupdate.update(updates)
    res.status(200).json(courseupdate
    )
    } catch (error) {
    res.status(404).json({message:error.message})
        
    }
}

exports.deletecourse=async(req,res)=>{
    await course.destroy({
        where:{id:req.params.id}
    }).then(result=>{
        if(result){
            res.status(200).send({message:"borrado de manera exitosa"})            
        }
        else{
            res.status(200).send({message:"no se econtro "})
        }
    }).catch(error=>{
        res.status(404).send({message:error})
    })
}