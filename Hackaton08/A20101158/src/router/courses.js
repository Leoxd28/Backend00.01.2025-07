const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller.js");
const AuthMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", AuthMiddleware(["profesor", "alumno"]), getAllCourses);
router.get("/:id", AuthMiddleware(["profesor", "alumno"]), getCourseById);
router.post("/", AuthMiddleware(["profesor"]), createCourse);
router.put("/:id", AuthMiddleware(["profesor"]), updateCourse);
router.delete("/:id", AuthMiddleware(["profesor"]), deleteCourse);

module.exports = router;