const db = require('../models');

exports.allAccess = (req,res)=>{


    res.status(200).send("Contenido Public")
}

exports.onlyUser = (req, res)=>{

    res.status(200).send("Contenido del Usuario");
}
exports.onlyModerator = (req,res)=>{
    res.status(200).send("Contenido del Moderator");
}

exports.onlyAdmin = (req,res)=>{
    res.status(200).send("Contenido del Admin");
}