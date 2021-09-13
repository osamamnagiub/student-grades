const express = require('express');
const logger = require("./startup/logging");
const mongoose = require('mongoose')
const config = require('config')
const app = express();


require('./startup/config')()
require('./startup/db')()  
require('./startup/routes')(app); 
require('./startup/swagger')(app)   

// initialize workers
require('./startup/worker');

// env to development by default if it is not set
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = "development"


const port = process.env.PORT || config.get("appPort");

const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.log('Closing http server.');
  server.close(() => {
    logger.log('Http server closed.');
    mongoose.connection.close(false, () => {
      logger.log('MongoDb connection closed.');
      process.exit(0);
    });
  })
});


module.exports = server;

