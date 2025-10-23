const {Op}=require("sequelize")
const db=require("../models")
const course=db.course
const User=db.User
const comment=db.comment
const lesson=db.lesson


exports.addcomment=async(req,res)=>{
 const idlesson=req.params.idc
 const idUser=req.body.idUser
 const text=req.body.text
 
 if (!idlesson) {
    return res.status(404).send({message:"curso no encontrado"})
 }
 if (!idUser) {
    return res.status(404).send({message:"id invalido"})
 }
 const data=await db.comment.create({
    courseId:idlesson,
    userId:idUser,
    body:text
 })

 if(!text||text.trim().length<10){
    return res.status(404).send({message:"texto invalido"})
 }
 return res.status(200).send(data)
}

exports.viewcomment=async(req,res)=>{

  const lessonsid=req.params.id
  const page=req.query.page
  const size=req.query.size
  let inicio=(page-1)*size
  let final=page*size



   const lesson = await db.lesson.findByPk(lessonsid,{include:[{model:comment,as:"comments",attributes:["body"],include:[{model:User,as:"author",attributes:["firstName","lastname","email"]}]}]})

   const comments=lesson.comments
   const paginD=comments.slice(inicio,final)
 return res.status(200).send(lesson)
}   