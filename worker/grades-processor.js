const emailService = require("../services/emailService");
const {parseGrades} = require("../services/gradesParser");
const {processGrades} = require("../services/gradesProcessor");

// initialize db for the worker because its being spawned in its own process
require('../startup/db')();

// kick off the process
module.exports = async job => {
    const data = await parseGrades(job.data.filepath)

    await processGrades(job.data.courseId, job.data.teacherName, data, job.updateProgress)

    return await emailService.sendEmail(job.data)
}
