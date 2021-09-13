const { Worker } = require('bullmq')
const config = require('config')
const logger = require("../startup/logging");


const redisConnection = config.get('redisConnection')
const concurrency = config.get('concurrency')
const queueName = config.get('queueName')

const worker = new Worker(queueName, `${__dirname}/grades-processor.js`, {
    connection: redisConnection,
    concurrency,
})

logger.info('worker listening for jobs');

module.exports = {
    worker,
}


