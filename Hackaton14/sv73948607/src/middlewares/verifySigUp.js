const db = require("../models")
const ROLES=db.ROLES
const User=db.user

checkDuplicateUsernameOrEmail=async (req,res,next)=>{
    try{let err =""
       
        if( req.body.username&&req.body.email){
           const user =await User.findOne({Username:req.body.username})
           const email =await User.findOne({email:req.body.email})       
          
        if(user){
        res.status(500).send("usario tomado")
        err="usuario"
        return}
       
        if(email){
        res.status(500).send("email usado")
        err="email"
        return
       }
       next();
       
    }else{
       
     res.status(404).send("verfique el usuario y email")
    }}
    catch(err){
        res.status(500).send(`error ${err} no se pudo leer`)

    }}

    

checkRoleExisted = (req,res,next)=>{
    if(req.body.roles){
       for(let index=0 ; index< req.body.roles.length; index++){
       const element=req.body.roles[index]
       if(!ROLES.includes(element)){
        res.status(401).send({message:`el Rol ${element} no existe`})
        return;
         }

       }
    
    }
   next()
}


const verifySignUp={
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
}

module.exports=verifySignUp