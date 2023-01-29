const db = require("../db/queries");
const { User } = require("./user.js");

class Admin extends User {

    constructor(
        userID, firstName, lastName, birthdate, nationalID, phone,
        email, password, userUUID, adminID
    ) {
        super(userID, firstName, lastName, birthdate, nationalID, phone, 
            email, password, userUUID
        );
        this.adminID = adminID;
    }
}

class AdminsManager {

    static async getAdmins() {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN adminusers ON users.useruuid = adminusers.useruuid;");
        console.log(queryResponse);
        const admins = adminsDataToObject(queryResponse);
        return admins;
    }

    static async getOneById(requestedId) {
        const queryResponse = await db.query(
            "SELECT * FROM users WHERE userid = $1",
            [requestedId]
        );
        const users = usersDataToObject(queryResponse);
        return users[0];
    }

    static async createUser(user) {
        const dataArray = usersObjectToData(user);
        const queryResponse = await db.query(
            "INSERT INTO users(firstname,lastname, birthdate, nationalid, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            dataArray
        );
        if (!queryResponse) {
            return null;
        }
        const responseObject = {
            useruuid: queryResponse[0].useruuid
        }
        return responseObject;
    }
}

function adminsDataToObject(data) {
    const admins = [];
    for (const adminData of data) {
        admins.push(
            new Admin(
                adminData.userid,
                adminData.firstname,
                adminData.lastname,
                adminData.birthdate,
                adminData.nationalid,
                adminData.phone,
                adminData.email,
                adminData.password,
                adminData.useruuid,
                adminData.adminid
            )
        );
    }
    return admins;
}

function adminsObjectToData(user) {
    return ([
        user.firstName,
        user.lastName,
        user.birthdate,
        user.nationalID,
        user.phone,
        user.email,
        user.password,
    ]);
}

module.exports = AdminsManager;
