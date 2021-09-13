const { Worker } = require('bullmq')
const config = require('config')
const logger = require("../startup/logging");


const redis_url = config.get('redis_url');
const concurrency = config.get('concurrency')
const queueName = config.get('queueName')

const worker = new Worker(queueName, `${__dirname}/grades-processor.js`, {
    connection: {
        host: redis_url,
        port: 6379
    },
    concurrency,
})

logger.info('worker listening for jobs');

module.exports = {
    worker,
}


