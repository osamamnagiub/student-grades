const { courseIdValidator, pageNumberValidator } = require("../middleware/validation");
const auth = require("../middleware/auth");

const coursesController = require("../controllers/CoursesController");
const express = require("express");
const router = express.Router();

router.get("/:courseId/grades/:page?",
    auth,
    courseIdValidator,
    pageNumberValidator,
    coursesController.getCourseGrades);

router.post('/:courseId/grades/upload',
    auth,
    courseIdValidator,
    coursesController.uploadGrades);

module.exports = router;