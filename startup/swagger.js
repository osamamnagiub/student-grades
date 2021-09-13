const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

module.exports = function (app) {
    // configure swagger
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}