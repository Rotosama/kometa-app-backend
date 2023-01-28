const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js")

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser );


module.exports = router;