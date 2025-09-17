const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deletCourse,
  getCourseStudents,
  createCourseStudents,
  coursesWithPagination,
} = require("../controllers/course.controller.js");

const authenticateToken = require("../middlewares/auth.middleware.js");
const checkRole = require("../middlewares/permissions.middleware.js");
const validateNombre = require("../middlewares/validateName.middleware.js");

router.get("/", authenticateToken, checkRole(["teacher", "student"]), getAllCourses);
router.get("/paginated", authenticateToken, checkRole(["teacher", "student"]), coursesWithPagination);
router.post("/", authenticateToken, checkRole(["teacher"]), validateNombre, createCourse);
router.get("/:id", authenticateToken, checkRole(["teacher", "student"]), getCourseById);
router.put("/:id", authenticateToken, checkRole(["teacher"]), updateCourse);
router.delete("/:id", authenticateToken, checkRole(["teacher"]), deletCourse);
router.get("/:id/students", authenticateToken, checkRole(["teacher"]), getCourseStudents);
router.post("/:id/students", authenticateToken, checkRole(["teacher"]), createCourseStudents);

module.exports = router;