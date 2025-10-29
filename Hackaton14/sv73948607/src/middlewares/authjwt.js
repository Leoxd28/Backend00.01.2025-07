const db =require("../models")
const jwt=require("jsonwebtoken")

const User=db.user
const Role=db.role

const verifyToken=(req,res,next)=>{
     let token =req.sesion?.token
     if(!token){
        return res.status(401).send({message:"no estas enviando el token"})
     }
      jwt.verify(token,process.env.JWT_SECRECT,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:"token invalido"})
        }
        req.userId=decoded.id
     next()
      })
}

const isModerator=async(req,res,next)=>{
try {
    const user =await User.findById(req.userId).exec()
   if(!user){
      return res.status(404).send({message:"Usuario no encontrado"})       
}
const roles=await Role.find({_id:{$in:user.roles}}).exec()
const hasModerator=roles.some(r=>r.name==="moderator")
    if(hasModerator){
    return next()}
        return res.status(403).send({message:"se reqjuire el rol de moderador"})
}catch(err){
    return res.status(500).send({message:err.message||err})
}
}

const isAdmin= async(req,res,next)=>{
    try {
        const user = await User.findById(req.userId).exec()  
        if(!user){
            return res.status(404).send({message:"Usuario no encontrado"})
        }
    const roles=await Role.find({_id:{$in:user.roles}}).exec()
    const hasAdmin=roles.some(r=>r.name==="admin")    
         if(hasAdmin){
            return next()
         }   
         return res.status(403).send({message:"se require el rol de admin"})
}
     catch (err) {
         return res.status(500).send({message:err.message||err})
    }
}
 
const authJwt={
    verifyToken,
    isModerator,
    isAdmin
}

module.exports=authJwt