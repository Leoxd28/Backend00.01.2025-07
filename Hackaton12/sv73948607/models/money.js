const{Schema,model,ModifiedPathsSnapshot}=require("mongoose")
const { productRouter } = require("../routes/products.routes")

const moneySchema=new Schema({
    count:{
        type:Number,
        required:true    }
},{timestamps:true})

moneySchema.index({count:"text"})

module.exports=model("money",moneySchema)