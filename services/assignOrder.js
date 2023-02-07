const { DeliverersManager } = require("../models/delivery");
const OrdersManager = require("../models/order");

const assignOrder = async () => {
    // check if there are available deliverers else return
    const availableDeliverers = await DeliverersManager.getDeliverersByAvailability(true);
    if (availableDeliverers.length === 0) {
        return ;
    }
    // check if there are Pending orders else return
    const pendingOrders = await OrdersManager.getAllByOrderStatus("Pending");
    if (pendingOrders.length === 0) {
        return ;
    }
    // assign oldest order to first deliverer
    const orderToAssign = pendingOrders[0].orderUUID;
    const delivererToAssign = availableDeliverers[0].useruuid;
    const assignedOrder = await OrdersManager.updateDeliveryStatus(delivererToAssign, orderToAssign);
    if (assignedOrder) {
        await DeliverersManager.updateDelivererAvailablity(delivererToAssign, false);
    }
}

module.exports = assignOrder;