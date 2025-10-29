module.exports=(req,res,next)=>{
    const {user,email}=req.body
  if(!user){
    const err=new Error("sin usuario");
   err.status=404
   return next(err)}
  if(!email){
    const err=new Error("sin email")
    err.status=404
    return next(err)
  } 
  next()
}