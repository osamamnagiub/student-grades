const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth')
const statusController = require('../controllers/StatusController');

router.get("/:jobid",
    auth,
    statusController.getUploadJobStatus);

module.exports = router;