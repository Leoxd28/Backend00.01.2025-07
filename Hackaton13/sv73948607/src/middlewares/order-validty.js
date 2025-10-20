module.exports=(req,res,next)=>{
if(req.headers["x-token"]!=="secret")
    {const err =new Error("token equivocado")
     err.status=404
     return next(err) 
    }
next()
}