const Joi = require("joi");

exports.validateStudentId = (studentId) => {
    const schema = Joi.string().guid().required().messages({"string.guid" : "invalid student id"});
    return schema.validate(studentId);
}

// validation logic for course id
exports.validateCourseId = (courseId) => {
    const schema = Joi.string().regex(/^[A-Z]{3}\d{4}$/).message('courseId must be in the form of ex: ELC2021, ATB2020');
    return schema.validate(courseId);
}

// validation logic for email
exports.validateEmail =  (email) => {
    const schema = Joi.string().email().message('invalid email');
    return schema.validate(email);
}


exports.validatePageNumber = (page) => {
    const schema = Joi.number().min(1);
    return schema.validate(page);
}
