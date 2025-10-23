    const { User } = require("../models")

    function verification(role){
        return async (req,res,next)=>{
            const UserId=req.headers["userid"]
            if(!UserId){ 
                return res.status(401).json({message:"Rol no proporcionado"})
            }
            const user= await User.findByPk(UserId)
            
            if(!user){
                return res.status(404).json({message:"usuario no encontrado"})
            }
            if(!role.includes(user.role)){
                return res.status(403).json({message:"no tiene permisos para esta funcion"})
            }

            req.userId=user.id
            req.userrole=user.role
                    next()
        }
    }   

    module.exports=verification