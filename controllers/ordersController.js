const OrdersManager = require("../models/order");
const assignOrder = require("../services/assignOrder");

const getOrders = async (req, res) => {
    let result;
    try {
        if (req.user.userRole === 'client') {
            result = await OrdersManager.getAllByClient(req.user.userUUID);
            return res.status(200).json(result);
        }
        if (req.user.userRole === 'delivery') {
            result = await OrdersManager.getAllByDelivery(req.user.userUUID);
            return res.status(200).json(result);
        }
        result = await OrdersManager.getAll();
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const getOrderById = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const result = await OrdersManager.getOneById(requestedId);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const getOrderByClientID = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const result = await OrdersManager.getAllByClient(requestedId);
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const getOrderByDeliveryID = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const result = await OrdersManager.getAllByDelivery(requestedId);
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const createOrder = async (req, res) => {
    if (req.user.userRole !== "client") {
        return res.status(401).send();
    }
    const newOrder = {
        clientUUID: req.user.userUUID,
        orderDate: req.body.orderDate,
        orderStatus: "Pending",
        orderCharge: req.body.orderCharge,
        originLatitude: req.body.originLatitude,
        originLongitude: req.body.originLongitude,
        destinationLatitude: req.body.destinationLatitude,
        destinationLongitude: req.body.destinationLongitude,
        description: req.body.description,
    };
    try {
        const result = await OrdersManager.createOrder(newOrder);
        if (result) {
            // call the assigning function
            assignOrder();
            return res.status(201).json(result);
        }
        return res.status(400).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const updateOrder = async (req, res) => {
    const updatedOrder = {
        orderStatus: req.body.orderStatus,
        orderUUID: req.params.id,
    };
    try {
        const result = await OrdersManager.updateStatus(updatedOrder);
        if (result) {
            return res.status(201).json(result);
        }
        return res.status(400).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const deleteOrder = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const result = await OrdersManager.deleteOrder(requestedId);
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
