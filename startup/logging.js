const winston = require('winston');
// require('winston-mongodb')
require('express-async-errors')


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({filename: 'logs/log.log'}),
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'logs/unhandledExceptions.log'}),
        new winston.transports.Console()
    ],
    exitOnError: false,
    silent: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
});


// handle unhandled rejections
// will be caught by winston
process.on('unhandledRejection', (ex) => {
    throw ex;
});


module.exports = logger;


