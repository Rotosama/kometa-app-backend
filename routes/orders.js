const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController.js")

router.get("/", ordersController.getOrders);

module.exports = router;
