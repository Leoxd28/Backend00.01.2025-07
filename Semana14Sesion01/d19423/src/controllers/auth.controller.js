const db = require('../models');
const bcrypt = require('bcryptjs');


const User = db.user;
const Role = db.role;

exports.signup = (req,res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(req.body.roles){
            Role.find({
                name: {
                    $in:req.body.roles
                }
            },(err, roles)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                user.roles=roles.map((roles)=>roles._id)
                user.save((err)=>{
                    if(err){
                        res.status(500).send({message:err});
                        return;
                    }
                    res.send({message: "Usuario Creado Correctamente"});
                })
            })
        }
        else{
            Role.findOne({
                name: 'user'
            },(err, role)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                user.roles=[role._id]
                user.save((err)=>{
                    if(err){
                        res.status(500).send({message:err});
                        return;
                    }
                    res.send({message: "Usuario Creado Correctamente"});
                })
            })
        }
    })
};

exports.signout = (req,res)=>{
    try {
        req.session = null;
        res.status(200).send({message: "Tu sesion ha terminado"})
    } catch (error) {
        res.status(500).send({message: error})
    }
}