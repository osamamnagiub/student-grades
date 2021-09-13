const { Queue } = require('bullmq');
const config = require('config');

const redisConnection = config.get('redisConnection')
const queueName = config.get('queueName')

const grades_queue = new Queue(queueName, {
    connection: redisConnection
});


exports.queue = grades_queue;