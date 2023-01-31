const db = require("../db/queries");
const { User, UsersManager } = require("./user.js");

class Client extends User {

    constructor(
        userID, firstName, lastName, birthdate, nationalID, phone,
        email, password, userUUID, clientID, defaultLatitude = 40.42, defaultLongitude = -3.70
    ) {
        super(userID, firstName, lastName, birthdate, nationalID, phone, 
            email, password, userUUID
        );
        this.clientID = clientID;
        this.defaultLatitude = defaultLatitude;
        this.defaultLongitude = defaultLongitude;
    }
}

class ClientsManager extends UsersManager {

    static async getClients() {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN clientusers ON users.useruuid = clientusers.useruuid;");
        const clients = clientsDataToObject(queryResponse);
        return clients;
    }

    static async getClientByUuid(requestedUuid) {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN clientusers ON users.useruuid = clientusers.useruuid WHERE useruuid = $1",
            [requestedUuid]
        );
        const clients = clientsDataToObject(queryResponse);
        return clients[0];
    }

    static async createClient(user) {
        const createdUserUuid = await this.createUser(user);
        const clientData = [createdUserUuid, ...clientsObjectToData(user)];
        const queryResponse = await db.query(
            "INSERT INTO clientusers(useruuid, defaultlatitude, defaultlongitude) VALUES ($1, $2, $3) RETURNING *",
            clientData
        );
        if (!queryResponse) {
            return null;
        }
        return queryResponse[0].useruuid;
    }
}

function clientsDataToObject(data) {
    const clients = [];
    for (const clientData of data) {
        clients.push(
            new Client(
                clientData.userid,
                clientData.firstname,
                clientData.lastname,
                clientData.birthdate,
                clientData.nationalid,
                clientData.phone,
                clientData.email,
                clientData.password,
                clientData.useruuid,
                clientData.clientid,
                clientData.defaultlatitude,
                clientData.defaultlongitude
            )
        );
    }
    return clients;
}

function clientsObjectToData(user) {
    return ([
        user.defaultLatitude,
        user.defaultLongitude
    ]);
}

module.exports = { Client, ClientsManager };
