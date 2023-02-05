const { DeliverersManager } = require("../models/delivery");
const OrdersManager = require("../models/order");

const assignOrder = async () => {
    // check if there are available deliverers else return
    console.log("checking for available deliverers");
    const availableDeliverers = await DeliverersManager.getDeliverersByAvailability(true);
    if (availableDeliverers.length === 0) {
        return ;
    }
    // check if there are Pending orders else return
    console.log("checking for pending orders");
    //const pendingOrders = await OrdersManager
    // assign oldest order to first deliverer
    console.log("assigning oldest order to first delivery match");
}

module.exports = assignOrder;