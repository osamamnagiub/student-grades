const {StudentGrade} = require("../models/studentGrade");
const AppError = require("../utils/appError");

exports.getStudentGrades = async (req, res, next) => {
    const grade = await StudentGrade.findOne({
        studentId: req.params.studentId,
        courseId: req.params.courseId
    });

    if (!grade) return next(new AppError(404, "student grade was not found"));

    res.send({
        grade: grade.grade,
        score: grade.score,
        uploadedBy: grade.teacherName,
        uploadDate: grade.createdDate
    });
}
