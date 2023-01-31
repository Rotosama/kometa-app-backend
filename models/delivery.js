const db = require("../db/queries");
const { User, UsersManager } = require("./user.js");

class Deliverer extends User {

    constructor(
        userID, firstName, lastName, birthdate, nationalID, phone,
        email, password, userUUID, deliveryID, isAvailable = false, currentLatitude = 40.42, currentLongitude = -3.70
    ) {
        super(userID, firstName, lastName, birthdate, nationalID, phone, 
            email, password, userUUID
        );
        this.deliveryID = deliveryID;
        this.isAvailable = isAvailable;
        this.currentLatitude = currentLatitude;
        this.currentLongitude = currentLongitude;
    }
}

class DeliverersManager extends UsersManager {

    static async getDeliverers() {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN deliveryusers ON users.useruuid = deliveryusers.useruuid;");
        const deliverers = delivererDataToObject(queryResponse);
        return deliverers;
    }

    static async getDelivererByUuid(requestedUuid) {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN deliveryusers ON users.useruuid = deliveryusers.useruuid WHERE useruuid = $1",
            [requestedUuid]
        );
        const deliverers = delivererDataToObject(queryResponse);
        return deliverers[0];
    }

    static async createDeliverer(user) {
        const createdUserUuid = await this.createUser(user);
        const delivererData = [createdUserUuid, ...delivererObjectToData(user)];
        const queryResponse = await db.query(
            "INSERT INTO deliveryusers(useruuid, isavailable, currentlatitude, currentlongitude) VALUES ($1, $2, $3, $4) RETURNING *",
            delivererData
        );
        if (!queryResponse) {
            return null;
        }
        return queryResponse[0].useruuid;
    }
}

function delivererDataToObject(data) {
    const deliverers = [];
    for (const delivererData of data) {
        deliverers.push(
            new Deliverer(
                delivererData.userid,
                delivererData.firstname,
                delivererData.lastname,
                delivererData.birthdate,
                delivererData.nationalid,
                delivererData.phone,
                delivererData.email,
                delivererData.password,
                delivererData.useruuid,
                delivererData.deliveryid,
                delivererData.isAvailable,
                delivererData.currentlatitude,
                delivererData.currentlongitude
            )
        );
    }
    return deliverers;
}

function delivererObjectToData(user) {
    return ([
        user.isAvailable,
        user.currentLatitude,
        user.currentLongitude
    ]);
}

module.exports = { Deliverer, DeliverersManager };
