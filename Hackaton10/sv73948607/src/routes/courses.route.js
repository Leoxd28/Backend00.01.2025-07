const controller=require("../controllers/courses.controllers")
const verification=require("../middleware/verification")
const express=require("express")
const CoursesRouter=express.Router()

CoursesRouter.post("/postcourse",verification(["admin","instructor"]),controller.addCourse)
CoursesRouter.get("/getcourse",controller.searchCourse)
CoursesRouter.get("/slug",controller.getslug)
CoursesRouter.put("/update/:id",controller.update)
CoursesRouter.delete("/delete/:id",controller.deletecourse)
module.exports={CoursesRouter}
