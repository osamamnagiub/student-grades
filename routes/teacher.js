const teacherController  = require("../controllers/TeacherController");

const express = require("express");
const router = express.Router();

router.post("/", teacherController.registerTeacher);


module.exports = router;