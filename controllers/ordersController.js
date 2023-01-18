const orders = require("../orders.json");

const allOrders = (req, res) => {
    const userId = parseInt(req.body.id);
    const userOrders = orders.filter(order => order.clientId === userId);
    return res.status(200).json(userOrders);
}

const singleOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    const singleOrder = orders.filter(order => order.orderId === orderId)[0];
    if (singleOrder)
        return res.status(200).json(singleOrder);
    return res.status(404).send("No order matches that id");
}

const addOrder = (req, res) => {
    const newOrder = req.body;
    const newOrderId = orders[orders.length -1].orderId + 1;
    orders.push({id: newOrderId, ...newOrder});
    return res.status(201).json({id: newOrderId, ...newOrder});
}

module.exports = { allOrders, singleOrder, addOrder };