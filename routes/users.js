const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js")

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserByUuid);

module.exports = router;