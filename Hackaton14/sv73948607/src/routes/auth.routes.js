const authJwt=require("../middlewares/authjwt")
const controller=require("../controller/auth.controller")
 
 module.exports=(app)=>{
     app.use((req,res,next)=>{
         res.header(
            "Access-Control-Allow-Headers",
            "Origin,Content-Type,Accept"
            )
            next()
        })
      app.get("/api/public",controller.allAccess)
      app.get("/api/onlyuser",[authJwt.verifyToken],controller.onlyUser)    
      app.get("/api/onlymoderator",[authJwt.verifyToken,authJwt.isModerator],controller.onlyModerator)
      app.get("/api/onlyadmin",[authJwt.verifyToken,authJwt.isAdmin],controller.onlyAdmin)
        }





