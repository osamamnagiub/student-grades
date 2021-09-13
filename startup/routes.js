const teachers = require("../routes/teacher");
const auth = require("../routes/auth");
const status = require("../routes/status");
const courses = require("../routes/courses");
const student = require("../routes/student");
const error = require('../middleware/errorHandler');
const compression = require('compression')
const helmet = require('helmet')
const cors = require("cors");
const express = require('express');



module.exports = function (app) {

    app.use(express.json());
    app.use(compression());
    app.use(helmet());
    app.use(cors());

    app.use("/api/teacher", teachers);
    app.use("/api/login", auth);
    app.use("/api/status", status);
    app.use("/api/courses", courses);
    app.use("/api/student", student);
    app.use(error)

}