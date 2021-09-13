const logger = require("../startup/logging");


module.exports = function (err, req, res, next) {
    logger.error(err.message);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'internal server error';

    return res.status(statusCode).json({
        message: message
      });
}