const multer=require("multer")
const upload=multer({
        dest:"uploads/",
        limits: {fileSize: 2*1024*1024, files: 1}
    })

module.exports=upload