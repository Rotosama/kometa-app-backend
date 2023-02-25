const db = require("../db/queries");
const { User, UsersManager } = require("./user.js");

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

class AdminsManager extends UsersManager {

    static async getAdmins() {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN adminusers ON users.useruuid = adminusers.useruuid;");
        const admins = adminsDataToObject(queryResponse);
        return admins;
    }

    static async getAdminByUuid(requestedUuid) {
        const queryResponse = await db.query(
            "SELECT * FROM users JOIN adminusers ON users.useruuid = adminusers.useruuid WHERE users.useruuid = $1",
            [requestedUuid]
        );
        const admins = adminsDataToObject(queryResponse);
        return admins[0];
    }

    static async createAdmin(user) {
        const createdUserUuid = await this.createUser(user);
        const queryResponse = await db.query(
            "INSERT INTO adminusers(useruuid) VALUES ($1) RETURNING *",
            [createdUserUuid]
        );
        if (!queryResponse) {
            return null;
        }
        return queryResponse[0].useruuid;
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
        user.password
    ]);
}

module.exports = { Admin, AdminsManager };
