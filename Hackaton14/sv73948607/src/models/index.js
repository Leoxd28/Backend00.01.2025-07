const mongoose=require("mongoose")

const db={}

db.mongoose=mongoose

db.user=require("./user.model")
db.role=require("./role.model")


db.ROLES=["admin","moderator","user"]

db.init =async()=>{
   try{
   const count =await db.role.countDocuments()
    if(count===0){
      try{
         await db.role.create({name:"user"})
      }catch(error){
         console.log("error al crear user")
      }

      try{
         await db.role.create({name:"moderator"})
      }catch(error){
         console.log("erro al crear moderator")
      }

      try{
         await db.role.create({name:"admin"})
      }catch(error){
         console.log("error al crear admin")
      }
    }
   }
catch(error){
console.log(error)
}}
module.exports=db