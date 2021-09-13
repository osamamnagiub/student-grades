const { worker } = require('../worker/grades-worker')
const logger = require("./logging");

worker.on('completed', job => {
    logger.info(`Completed job ${job.id} successfully`);
})

worker.on('failed', (job, err) => {
    logger.info(`Failed job ${job.id} with ${err}`)
})

