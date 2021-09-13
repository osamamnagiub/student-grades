const Joi = require("joi");
const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
})
const Teacher = mongoose.model('Teacher', teacherSchema);


// validation logic for teacher
function validateTeacher(teacher) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        username : Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(teacher);
}

exports.validate = validateTeacher;
exports.Teacher = Teacher
exports.TeachSchema = teacherSchema;

