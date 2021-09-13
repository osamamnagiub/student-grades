const Joi = require('joi')

const AppError = require('../utils/appError');
const {validateStudentId, validateCourseId, validatePageNumber} = require("../utils/validationHelper");

// validation logic for teacher id
exports.studentIdValidator = (req, res, next) => {
    const { error } = validateStudentId(req.params.studentId);
    if (error) return next(new AppError(400, error.message));

    next();
}

// validation logic for course id
exports.courseIdValidator = (req, res, next) => {
    const { error } = validateCourseId(req.params.courseId);
    if (error) return next(new AppError(400, error.message));

    next();
}

exports.pageNumberValidator = (req, res, next) => {
    const { error } = validatePageNumber(req.query.page);
    if (error) return next(new AppError(400, error.message));

    // set default value if page is undefined
    next();
}

exports.loginValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return next(new AppError(400, error.message));
    next();
}


