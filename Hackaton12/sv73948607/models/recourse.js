const{Schema,model,ModifiedPathsSnapshot}=require("mongoose")

const recourseSchema=new Schema({
   name:{
    type:String,
    required:true,
    trim:true,
   },
   price:{
    type:Number,
    required:true
   },
   count:{
    type:Number,
    default:0,
   },

} ,{timestamps:true})

recourseSchema.index({name:"text"})

module.exports=model("recourse",recourseSchema)