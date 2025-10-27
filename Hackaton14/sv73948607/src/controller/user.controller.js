const db =require("../models")
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")


const User=db.user
const Role=db.role

exports.create=async (req,res)=>{
   try{
    const user=new User({
    Username:req.body.username,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,8)
   })       
   

   let roles=[]
   if(req.body.roles&&req.body.roles.length>0){
    roles=await Role.find({name:{$in:req.body.roles}    })
   }else{
    const role=await Role.findOne({name:"user"})
    roles=[role]
   }

   user.roles=roles.map(r=>r._id)

   await user.save()

   res.send({message:"usario crado con exito"})
}catch(err){
   res.status(500).send({message:err.message})
}
}

exports.signout=(req,res)=>{
    try{
        req.session=null
        res.status(200).send({message:"tu sesion ha terminado"})
    }catch(error){
        res.status(500).send({message:error})
    }
}

exports.signin=(req,res)=>{ 
     User.findOne({Username:req.body.username})
         .populate("roles","-__v")
         .exec((err,user)=>{
               if(err){
               res.status(500).send({message:err})                
               return   
            }
             if(!user){
                res.status(404).send({message:"Usuario no encontrado"})
              return 
            }
            let passwordIsValid=bcrypt.compareSync(req.body.password,user.password)
           if(!passwordIsValid){
            res.status(401).send({message:"contraseña incorrecta"})
            return
           }
            const token=jwt.sign(
            {
                id:user.id
            },  
            process.env.JWT_SECRET,
            {
                algorithm:"HS256",
                allowInsecureKeySizes:true,
                expiresIn:86400
            }
            )
            let authorities=[]
            user.roles.forEach(Element=>{
                authorities.push(Element)
            })
            req.session.token=token
          
            res.status(200).send({
                id:user.id,
                username:user.Username,
                email:user.email,
                roles:authorities,
                codigo:token
            })

         })

} 