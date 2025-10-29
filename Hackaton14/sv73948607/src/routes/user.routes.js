const verifySignUp =require("../middlewares/verifySigUp")
const controller=require("../controller/user.controller")

module.exports=(app)=>{
       app.use((req,res,next)=>{
          res.header(
               "Access-Control-Allow-Headers",
                "Origin,Content-Type,Accept"
          )
           next()
        })
   app.post("/api/create",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRoleExisted],controller.create)   
   app.post("/api/signout",controller.signout)
   app.post("/api/signin",controller.signin)
   

}