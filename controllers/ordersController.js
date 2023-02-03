const db = require("../db/queries");
const OrdersManager = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const result = await OrdersManager.getAll();
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
  const newOrder = {
    clientUUID: req.body.clientUUID,
    orderDate: req.body.orderDate,
    orderStatus: req.body.orderStatus,
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
      return res.status(201).json(result);
    }
    return res.status(400).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const updateOrder = async (req, res) => {
  const updatedOrder = [
    (orderStatus = req.body.orderStatus),
    (orderUUID = req.params.id),
  ];
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
  getOrderByDeliveryID,
  getOrderByClientID,
  createOrder,
  updateOrder,
  deleteOrder,
};
