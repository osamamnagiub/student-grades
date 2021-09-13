const studentController = require("../controllers/StudentController");
const {courseIdValidator, studentIdValidator} = require("../middleware/validation");

const express = require("express");
const router = express.Router();


router.get("/:studentId/grades/:courseId",
    studentIdValidator,
    courseIdValidator,
    studentController.getStudentGrades);

module.exports = router;