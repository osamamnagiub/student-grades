const tokenService = require('../services/TokenService');
const AppError = require('../utils/appError');


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return next(new AppError(401, 'Access denied. no token provided'));

    const decodedPayLoad = tokenService.verifyToken(token);
    if (!decodedPayLoad) return next(new AppError(400, 'invalid token'));

    req.user = decodedPayLoad;
    next();
}

