const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController.js")

const orders = require("../orders.json");

router.get("/", ordersController.allOrders);
router.get("/:id", ordersController.singleOrder);
router.post("/", ordersController.addOrder);


module.exports = router;
