const authController = require('../controllers/AuthController')
const { loginValidator } = require('../middleware/validation');

const express = require("express");
const router = express.Router();

router.post("/",
    loginValidator,
    authController.login);


module.exports = router;
