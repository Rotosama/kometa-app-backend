const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController.js");
const { orderValidator } = require("../services/validator");
const checkValidation = require("../middleware/checkValidation");

router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrderById);
router.post("/", orderValidator, checkValidation, ordersController.createOrder);
router.delete("/:id", ordersController.deleteOrder);
router.patch("/:id", ordersController.updateOrder);

module.exports = router;
