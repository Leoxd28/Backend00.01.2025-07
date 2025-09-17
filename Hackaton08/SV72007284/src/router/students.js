const express = require('express');
const router = express.Router();
const { getAllNotes, 
    getStudentById, 
    studentsWithFilterAndOrder,
    rankingStudents,
 } = require("../controllers/student.controller.js");

const authenticateToken = require("../middlewares/auth.middleware.js");
const checkRole = require("../middlewares/permissions.middleware.js");

router.get("/", authenticateToken, checkRole(["teacher"]), studentsWithFilterAndOrder);
router.get("/ranking", authenticateToken, checkRole(["teacher"]), rankingStudents);
router.get("/", authenticateToken, checkRole(["teacher"]), getAllNotes);
router.get("/:id", authenticateToken, checkRole(["teacher"]), getStudentById);

module.exports = router;