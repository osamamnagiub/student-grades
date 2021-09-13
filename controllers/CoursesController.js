const formidable = require('formidable');
const _ = require('lodash');
const { queue } = require('../worker/grades-queue');
const { StudentGrade } = require("../models/studentGrade");
const AppError = require('../utils/appError');
const GradesProcessingRequest = require('../models/gradesProcessingRequest');
const { validateEmail } = require("../utils/validationHelper");


exports.getCourseGrades = async (req, res, next) => {
    const page = req.query.page || 1; // default to 1
    const take = 10;
    const skip = (page - 1) * take;

    const totalCount = await StudentGrade.countDocuments({});
    const grades = await StudentGrade.find({ courseId: req.params.courseId }).skip(skip).limit(take);

    res.send({
        count: totalCount,
        result: grades
    });
}


// initialize form handler
const form = formidable({
    multiples: false,
    keepExtensions: true,
    allowEmptyFiles: false,
    maxFields: 2,
    filter: function ({ name, originalFilename, mimetype }) {
        // keep only images
        return mimetype && mimetype.includes("text/csv") || mimetype.includes("application/vnd.ms-excel");
    }
});


exports.uploadGrades = async (req, res, next) => {
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(new AppError(500, err));
            return;
        }

        // get the first file in the collection
        // i assume that field name is optional 
        let file = _.values(files)[0];
        if (!file) return next(new AppError(400, 'invalid file, make sure file is a csv file'));

        const { error, value } = validateEmail(fields.email);
        if (error) return next(new AppError(400, 'invalid email'));

        let email = value;
        const job = await queue.add('processFile', new GradesProcessingRequest(
            req.user.username,
            req.params.courseId,
            email,
            file.path
        ));


        res.json({
            jobid: job.id,
            statusUrl: `/api/status/${job.id}`
        });
    });
}
