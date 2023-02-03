const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController.js")

router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrderById);
router.get("/:id", ordersController.getOrderByDeliveryID);
router.get("/:id", ordersController.getOrderByClientID);
router.post("/", ordersController.createOrder);
router.delete("/:id", ordersController.deleteOrder);
router.patch("/:id", ordersController.updateOrder);

module.exports = router;
