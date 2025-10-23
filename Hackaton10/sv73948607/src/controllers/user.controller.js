const { Op } = require("sequelize")
const db=require("../models")
const User=db.User

exports.addUser =async (req,res)=>{
let =req.body

const usuarioNuevo={
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    passwordHash:req.body.passwordHash,
    role:req.body.role
}
User.create(usuarioNuevo).then(data=>{
    res.status(201).send(data)
}).catch(error=>{
    res.status(500).send({message:error})
})
}

exports.viewUser= async(req,res)=>{
     const q =req.query.q || ""
     let page=parseInt(req.query.page) 
     let size =parseInt(req.query.size)
     let inicio=(page-1)*size
     let final=page*size
     try{ const data =await User.findAll({
        where:{[Op.or]:[
            {firstName: {[Op.like]:`%${q}%`}},
            {lastname:{[Op.like]:`%${q}%`}},
            {email:{[Op.like]:`%${q}%`}}
        ]}
    })
    if
    (page>0 ||size>0){
        let datafin=data.slice(inicio,final)
        res.status(200).send(datafin)
    }else{
        res.status(200).send(data)}
        }
        catch(error){
        res.status(500).send({message:error})
    }
}         