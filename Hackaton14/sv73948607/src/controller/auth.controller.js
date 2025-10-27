const db=require("../models")

const User=db.user

exports.allAccess=(req,res)=>{
   res.status(200).send("contenido publico")

}

exports.onlyUser=async (req,res)=>{
   
 const user=await User.findById(req.userId).exec()
    if(!user){
        return res.status(404).send({message:"Usuario no encontrado"})
    }              
}

exports.onlyModerator=async(req,res)=>{

  const user=await User.findById(req,userId).exec()
    if(!user){
      return res.status(404).send({message:"usuario no encontrado"})
    }
  }



exports.onlyAdmin=async(req,res)=>{
    
    const user=await User.findById(req.userId).exec()
      if(!user){
        return res.status(404).send({message:"usuario no encontrado"})
      }

}