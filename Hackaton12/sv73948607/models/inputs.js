const{Schema,model,ModifiedPathsSnapshot}=require("mongoose")

const inputsSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    }
},{timestamps:true})

inputsSchema.index({name:"text"})

module.exports=model("inputs",inputsSchema)