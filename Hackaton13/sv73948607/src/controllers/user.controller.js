let users=[]
let multer=require("multer")

exports.create = async (req,res)=>{
try {
      const newuser = req.body
      users.push(newuser)

      res.status(201).send(newuser)  

} catch (error) {
    res.status(404).send(error)
}

}

exports.search =async(req,res)=>{
try {
     const user =users.find(u=> u.id==req.params.id)
    if(!user)res.status(404).send("id invalida")
     
     res.status(201).send(user)   

} catch (error) {
   res.status(404).send(error)   
}
}

exports.all =async(req,res)=>{
    try {
        res.status(201).send(users)
    } catch (error) {
        res.status(401).send(error)
    }
}
exports.uploadImage=async(req,res)=>{
  if(!req.file){
    return res.status(404).send("no file")
  }
res.json({
    mensaje:"imagen recibida",
    file:req.file
})
}
module.exports.users=users