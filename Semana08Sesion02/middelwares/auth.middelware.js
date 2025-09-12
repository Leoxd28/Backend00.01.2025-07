


auth = (req,res,next)=>{
    const token = req.headers['token'];
    if(token==="teacher123"){
        req.user = {role: "teacher"}
        next();
    }
    else if(token==="student123"){
        req.user = {role: "student"}
        next();
    }
    else{
        res.status(403).json({error: "No Autorizado"})
    }
}


module.exports = auth;