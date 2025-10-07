const controller=require("../controllers/enrollments.controllers")
const express=require("express")
const enrollmentsRouter=express.Router()

enrollmentsRouter.post("/:idc/enrollmentadd",controller.addenrollments)
enrollmentsRouter.patch("/:Id/patch",controller.modify)
enrollmentsRouter.get("/:id/view",controller.view)
module.exports={enrollmentsRouter}