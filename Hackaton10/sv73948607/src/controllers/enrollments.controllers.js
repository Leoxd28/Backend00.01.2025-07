const{Op}=require("sequelize")
const db=require("../models")
const User=db.User
const course=db.course
const lesson=db.lesson
const enrollment=db.enrollment

exports.addenrollments=async(req,res)=>{
    const idcourse=req.params.idc
    const IdUser=req.body.IdUser
  
    try{
    const userfound=await User.findByPk(IdUser)
    if(!userfound){
        return res.status(404).json({message:"usario no encontrado"})
    } 
    
    const coursefound=await course.findByPk(idcourse)
    if(!coursefound){
        return res.status(404).json({message:"usario no verificaoo"})
    }


    const enrollments =await db.enrollment.create({
        courseId:idcourse,
        userId:IdUser
    })
    
res.status(200).send(enrollments)
}catch(error){
        res.status(500).json({message:"error"})
    }
}

exports.modify=async(req,res)=>{
  const Idenrollment=req.params.Id
  const {status,score}=req.body

  try{
    const enrollment=await db.enrollment.findByPk(Idenrollment)
  
     if(!enrollment){
        res.status(404).send({message:"no encontrado"})
     }   
     if (status!==undefined) {
        enrollment.statuss=status
     }
     if (score!==undefined) {
        enrollment.score=score
     }
 await enrollment.save()

 return res.status(200).json(enrollment)
}catch(error){
console.error(error)
return res.status(500).json({message:"mal hecho"})
}
}

exports.view=async(req,res)=>{
  const courseId= req.params.id
  const filterq=req.query.filterw

  const foundcourse= await course.findByPk(courseId,{include:[{model:User,as:"students",attributes:["firstName","lastname","email"],through:{attributes:["statuss","score"],where:{statuss:filterq}}}
  ]
})

     return res.status(200).send(foundcourse)

}