const{Schema,model,Types,ModifiedPathsSnapshot}=require("mongoose")

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:40
    },
    price:{
        type:Number,
        required:true,
        min:0,  
    }
    ,
    recourse:[
      {
      name:{type:String,required:true},
      amount:{type:Number,required:true,min:0} 
      }                
    ]   
    ,
    workers:{
        type:Types.ObjectId,
        ref:"workers",
        required:true,
    },
    time:{
         type:Number,
         required:true,
    },
    stock:
        {
        type:Number,
        required:true,
        default:0
        }
},{timestamps:true})

productSchema.index({tittle:"text"})

module.exports= model("product",productSchema)