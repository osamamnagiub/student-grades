const AppError = require('../utils/appError');
const { Teacher } = require("../models/teacher");
const authService = require('../services/AuthService');
const tokenService = require('../services/TokenService')


// validation is available as a middleware 
exports.login = async (req, res, next) => {
    let teacher = await Teacher.findOne({ username: req.body.username });
    if (!teacher) return next(new AppError(400, 'invalid username or password'));

    const validPassword = await authService.validatePassword(req.body.password, teacher.password);
    if (!validPassword) return next(new AppError(400, 'invalid username or password'));

    const token = tokenService.generateAuthToken({id: teacher._id, name: teacher.name, username: teacher.username})
    res.header('x-auth-token', token).send();
}

