const { Queue } = require('bullmq');
const config = require('config');

const redis_url = config.get('redis_url');

const queueName = config.get('queueName')

const grades_queue = new Queue(queueName, {
    connection: {
        host: redis_url,
        port: 6379
    }
});


exports.queue = grades_queue;