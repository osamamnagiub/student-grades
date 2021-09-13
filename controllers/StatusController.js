const { queue}= require('../worker/grades-queue');
const AppError = require("../utils/appError");



exports.getUploadJobStatus = async (req, res, next) => {
    const job = await queue.getJob(req.params.jobid);
    if (!job) return next(new AppError(404, 'job not found'));

    let state = await job.getState();

    let result = {
        id : job.id,
        state : state,
        progress: job.progress
    };

    if (job.failedReason)
        result.error = job.failedReason;

    if (job.returnvalue)
        result.emailInfo = job.returnvalue;
        
    let statusCode = 200;
    if (state === 'failed')
        statusCode = 422;


    res.status(statusCode).send(result);
}