const{Schema,model,Types, trusted}=require("mongoose")
const workersSchema=new Schema({
   name:{
    type:String,
    required:true,
    trim:true
   },
   year:{
   type:String,
   required:true
   },
   hour:{
    type:Number,
    required:true
   },
   job:{
    type:String,
    required:true
   },
   availabity:{
    type:Boolean,
    default:true
   }

},{timestamps:true})

workersSchema.index({name:"text"})

module.exports=model("workers",workersSchema)