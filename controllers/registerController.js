const bcrypt = require("bcrypt");
const { UsersManager } = require("../models/user.js");
const { Admin, AdminsManager } = require("../models/admin.js");
const { Client, ClientsManager } = require("../models/client.js");
const { Deliverer, DeliverersManager } = require("../models/delivery.js");

/*
The register function will perform the following:
Check email or national id is not duplicate (is a new user)
Hash the password and replace it in the body
Route user creation according to role
*/

const register = async (req, res) => {
    const existingUser = await UsersManager.getUserByEmailOrNationalId(
        req.body.email,
        req.body.nationalID
    );
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    try {
        let newUser;
        switch (req.body.role) {
            case "admin":
                newUser = await registerAdmin(req.body);
                break;
            case "client":
                newUser = await registerClient(req.body);
                break;
            case "delivery":
                newUser = await registerDeliverer(req.body);
                break;
            default:
                return res.status(400).json({ error: "Invalid enrolment" });
        }
        if (newUser) {
            return res.status(201).json({ message: "User created" });
        }
        return res.status(400).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const registerAdmin = async (userInfo) => {
    const newAdmin = new Admin(
        (userID = 0),
        userInfo.firstName,
        userInfo.lastName,
        userInfo.birthdate,
        userInfo.nationalID,
        userInfo.phone,
        userInfo.email,
        userInfo.password,
        (userUUID = 0),
        (adminID = 0)
    );
    try {
        const result = await AdminsManager.createAdmin(newAdmin);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const registerClient = async (userInfo) => {
    const newClient = new Client(
        (userID = 0),
        userInfo.firstName,
        userInfo.lastName,
        userInfo.birthdate,
        userInfo.nationalID,
        userInfo.phone,
        userInfo.email,
        userInfo.password,
        (userUUID = 0),
        (clientID = 0),
        userInfo.defaultLatitude,
        userInfo.defaultLongitude
    );
    try {
        const result = await ClientsManager.createClient(newClient);
        return result;
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const registerDeliverer = async (userInfo) => {
    const newDeliverer = new Deliverer(
        (userID = 0),
        userInfo.firstName,
        userInfo.lastName,
        userInfo.birthdate,
        userInfo.nationalID,
        userInfo.phone,
        userInfo.email,
        userInfo.password,
        (userUUID = 0),
        (deliveryID = 0),
        userInfo.isAvailable,
        userInfo.currentLatitude,
        userInfo.currentLongitude
    );
    try {
        const result = await DeliverersManager.createDeliverer(newDeliverer);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = { register };
