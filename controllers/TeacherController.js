const _ = require('lodash')
const { validate, Teacher } = require("../models/teacher");
const  authService = require('../services/AuthService');
const AppError = require('../utils/appError');

exports.registerTeacher = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return  next(new AppError(400, error.message));

    let teacher = await Teacher.findOne({ username: req.body.username});
    if (teacher) return next(new AppError(400, 'teacher already registered'));

    teacher = new Teacher(_.pick(req.body, ['password', 'name', 'username']));

   
    teacher.password = await authService.generatePasswordHash(teacher.password);
    await teacher.save();
    
    res.send(_.pick(teacher, ['_id', 'name', 'username']));
}