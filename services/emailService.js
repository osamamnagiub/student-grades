const nodemailer = require('nodemailer')
const config = require('config')
const logger = require("../startup/logging");


const smtp = config.get('smtp');
const transporter = nodemailer.createTransport(smtp)


exports.sendEmail = async ({ email, courseId, teacherName, gradesUrl }) => {
    if (!email) return;

    try {
        const emailConfigs = config.get('email');

        const info = await transporter.sendMail({
            from: emailConfigs.from,
            to: email,
            subject: `${courseId} results are published by ${teacherName}`,
            text:  `Course Results Link: ${gradesUrl}`
        })
        const previewURL = nodemailer.getTestMessageUrl(info)
        logger.info(`Preview URL: ${previewURL}`)

        return {
            sentTo: email,
            previewURL,
        }
    } catch (e) {
        logger.error(e);
    }
}
