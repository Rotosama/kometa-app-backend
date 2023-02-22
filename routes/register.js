const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController.js");
const { userValidator } = require("../services/validator");
const checkValidation = require("../middleware/checkValidation");

router.post("/", userValidator, checkValidation, registerController.register);

module.exports = router;
