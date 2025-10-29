const mongoose=require("mongoose")
const db=require("./src/models")

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{}).then(()=>{
            console.log("conectado mongoDB")
            db.init()
        })
    } catch (error) {
        console.error("error al conectar mongoDB")
        process.exit(1)
    }
}

module.exports=connectDB