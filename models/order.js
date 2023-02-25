const db = require("../db/queries");

class Order {
  constructor(
    orderID,
    clientUUID,
    deliveryUUID,
    orderDate,
    orderStatus,
    orderCharge,
    originLatitude,
    originLongitude,
    originAddress,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
    description,
    orderUUID
  ) {
    this.orderID = orderID;
    this.clientUUID = clientUUID;
    this.deliveryUUID = deliveryUUID;
    this.orderDate = orderDate;
    this.orderStatus = orderStatus;
    this.orderCharge = orderCharge;
    this.originLatitude = originLatitude;
    this.originLongitude = originLongitude;
    this.originAddress = originAddress;
    this.destinationLatitude = destinationLatitude;
    this.destinationLongitude = destinationLongitude;
    this.destinationAddress = destinationAddress;
    this.description = description;
    this.orderUUID = orderUUID;
  }
}

class OrdersManager {
  static async getAll() {
    const queryResponse = await db.query("SELECT * FROM orders");
    const orders = ordersDataToObject(queryResponse);
    return orders;
  }

  static async getOneById(requestedUUID) {
    const queryResponse = await db.query(
      "SELECT * FROM orders WHERE orderuuid = $1",
      [requestedUUID]
    );
    const orders = ordersDataToObject(queryResponse);
    return orders[0];
  }

  static async getAllByClient(requestedUUID) {
    const queryResponse = await db.query(
      "SELECT * FROM orders WHERE clientuuid = $1;",
      [requestedUUID]
    );
    const orders = ordersDataToObject(queryResponse);
    return orders;
  }

  static async getAllByDelivery(requestedUUID) {
    const queryResponse = await db.query(
      "SELECT * FROM orders WHERE deliveryuuid = $1;",
      [requestedUUID]
    );
    const orders = ordersDataToObject(queryResponse);
    return orders;
  }

  static async getAllByClientAndStatus(requestedUUID, queriedStatus) {
    let queryParameters = "";
    let queryStatus = [];
    if (typeof queriedStatus === 'string') {
        queryParameters = "$2";
        queryStatus.push(queriedStatus);
    } else {
        queriedStatus.forEach((e, i) => {
            queryParameters = queryParameters.concat('$', i + 2, ',');
        });
        queryParameters = queryParameters.substring(0, queryParameters.length - 1);
        queryStatus = queriedStatus;
    }
    const queryResponse = await db.query(
        "SELECT * FROM orders WHERE clientuuid = $1 AND orderstatus IN ("+ queryParameters +");",
        [requestedUUID, ...queryStatus]
    );
    const orders = ordersDataToObject(queryResponse);
    return orders;
  }

  static async getAllByOrderStatus(orderStatus) {
    const queryResponse = await db.query(
        "SELECT * FROM orders WHERE orderstatus = $1 ORDER BY orderdate;",
        [orderStatus]);
    const orders = ordersDataToObject(queryResponse);
    return orders;
  }

  static async createOrder(order) {
    const dataArray = ordersObjectToData(order);
    const queryResponse = await db.query(
      "INSERT INTO orders (clientuuid, orderdate, orderstatus, ordercharge, " +
      "originLatitude, originLongitude, originAddress, " +
      "destinationLatitude, destinationLongitude, destinationAddress, description)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;",
      dataArray
    );
    if (!queryResponse) {
      return null;
    }
    return queryResponse[0];
  }

  static async updateStatus(updatedOrder) {
    const queryResponse = await db.query(
      "UPDATE orders " +
        "SET orderstatus = $1 " +
        "WHERE orderuuid = $2 RETURNING *;",
      [updatedOrder.orderStatus, updatedOrder.orderUUID]
    );
    if (!queryResponse) {
      return null;
    }
    return queryResponse;
  }

  static async updateDeliveryStatus(deliveryUUID, orderUUID) {
    const queryResponse = await db.query(
        "UPDATE orders " +
        "SET deliveryuuid = $1, orderstatus = 'Delivering'" +
        "WHERE orderuuid = $2 RETURNING *;",
        [deliveryUUID, orderUUID]
    );
    if (!queryResponse) {
        return null;
    }
    return queryResponse;
  }

  static async deleteOrder(requestedUUID) {
    const queryResponse = await db.query(
      "DELETE FROM orders WHERE orderuuid = $1;",
      [requestedUUID]
    );
    if (!queryResponse) {
      return null;
    }
    return queryResponse;
  }
}

function ordersDataToObject(data) {
  const orders = [];
  for (const orderData of data) {
    orders.push(
      new Order(
        orderData.orderid,
        orderData.clientuuid,
        orderData.deliveryuuid,
        orderData.orderdate,
        orderData.orderstatus,
        orderData.ordercharge,
        orderData.originlatitude,
        orderData.originlongitude,
        orderData.originaddress,
        orderData.destinationlatitude,
        orderData.destinationlongitude,
        orderData.destinationaddress,
        orderData.description,
        orderData.orderuuid
      )
    );
  }
  return orders;
}

function ordersObjectToData(order) {
  return [
    order.clientUUID,
    order.orderDate,
    order.orderStatus,
    order.orderCharge,
    order.originLatitude,
    order.originLongitude,
    order.originAddress,
    order.destinationLatitude,
    order.destinationLongitude,
    order.destinationAddress,
    order.description,
  ];
}

module.exports = OrdersManager;
