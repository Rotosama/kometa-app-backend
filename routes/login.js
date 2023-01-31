const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController.js");
const verifyJWT = require("../middleware/verifyJWT.js");

router.post("/", loginController.authenticate);
router.get("/", verifyJWT,loginController.confirmAuthorization);

module.exports = router;
