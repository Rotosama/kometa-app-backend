const db = require("../db/queries");

class User {

    constructor(
        userID, firstName, lastName, birthdate, nationalID, phone,
        email, password, userUUID
    ) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.nationalID = nationalID;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.userUUID = userUUID;
    }
}

class UsersManager {

    static async getUsers() {
        const queryResponse = await db.query("SELECT * FROM users;");
        const users = usersDataToObject(queryResponse);
        return users;
    }

    static async getUserByEmailOrNationalId(requestedEmail, requestedNationalId) {
        const queryResponse = await db.query(
            "SELECT * FROM users WHERE (email = $1 OR nationalid = $2);",
            [requestedEmail, requestedNationalId]
        );
        const users = usersDataToObject(queryResponse);
        return users[0];
    }

    static async getUserByUuid(requestedUuid) {
        const queryResponse = await db.query(
            "SELECT * FROM users WHERE useruuid = $1;",
            [requestedUuid]
        );
        const users = usersDataToObject(queryResponse);
        return users[0];
    }

    static async createUser(user) {
        const dataArray = usersObjectToData(user);
        const queryResponse = await db.query(
            "INSERT INTO users(firstname,lastname, birthdate, nationalid, " +
            "phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            dataArray
        );
        if (!queryResponse) {
            return null;
        }
        return queryResponse[0].useruuid;
    }
}

function usersDataToObject(data) {
    const users = [];
    for (const userData of data) {
        users.push(
            new User(
                userData.userid,
                userData.firstname,
                userData.lastname,
                userData.birthdate,
                userData.nationalid,
                userData.phone,
                userData.email,
                userData.password,
                userData.useruuid
            )
        );
    }
    return users;
}

function usersObjectToData(user) {
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

module.exports = { User, UsersManager };
