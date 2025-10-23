const {Op, where} =require("sequelize")
const db=require("../models")
const User=db.User
const course=db.course
const lesson=db.lesson

exports.createlessons=async(req,res)=>{
    const count=await lesson.count({where:{courseid:req.params.id}})
    
    const lessonsnew={
         titlelesson:req.body.tittlelesson,
         sluglesson:req.body.sluglesson,
         bodylesson:req.body.bodylesson,
         courseId:req.params.id,
         order:count+1
        }
lesson.create(lessonsnew).then(data=>{ 
res.status(200).send(data)
}).catch(error=>{
res.status(404).send({message:error})
});
}

exports.viewlessons=async(req,res)=>{
    const order = req.query.order
    const lessondata=await lesson.findAll()
    
    lessondata.sort((a,b)=>{
        if(order==="asc"){
            return a.id - b.id
        }else{
            return b.id - a.id
        }
    })
    res.status(200).send(lessondata)
}

exports.updatelesson=async(req,res)=>{
    const courseId=req.params.idc
    const lessonId=req.params.idl
    const updates=req.body
    
    try{
        const coursefound =await course.findByPk(courseId)
        if(!coursefound){
            return res.status(400).json({message:"id no encontrado"})
        }

        const lessonFound=await lesson.findOne({
            where:{id:lessonId,courseId:courseId}
        })
        await lessonFound.update(updates)
        res.status(200).json(lessonFound)
    } catch(error){
        res.status(404).json({message:error.message})
    }
}

exports.deletelesson=async(req,res)=>{
    await lesson.destroy({
        where:{id:req.params.id}
    }).then(result=>{
        if(result){
            req.status(200).send({message:"borrado de manera exitosa"})
       }
    }).catch(error=>{
        res.status(404).send({message:error})
    })
}

