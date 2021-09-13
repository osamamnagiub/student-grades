const mongoose = require("mongoose");

const studentGradeSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    teacherName: String,
    grade: Number,
    score: String,
    createdDate: {
        type: Date,
        default: new Date()
    }
});


exports.StudentGrade = mongoose.model('StudentGrade', studentGradeSchema);

