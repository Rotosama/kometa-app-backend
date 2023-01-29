const bcrypt = require("bcrypt");
const { UsersManager } = require("../models/user.js");
const { Admin, AdminsManager } = require("../models/admin.js");
const { Client, ClientsManager } = require("../models/client.js");

/*
The register function will perform the following:
Check email or national id is not duplicate (is a new user)
Hash the password and replace it in the body
Route user creation according to role
*/

const register = async (req, res) => {
    const existingUser = await UsersManager.getUserByEmailOrNationalId(req.body.email, req.body.nationalID);
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    switch (req.body.role) {
        case "admin":
            await registerAdmin(req, res);
            break;
        case "client":
            await registerClient(req, res);
            break;
        default:
            return res.status(400).json({ error: "Invalid enrolment" });
    }
}

const registerAdmin = async (req, res) => {
    const newAdmin = new Admin(
        userID = 0,
        req.body.firstName,
        req.body.lastName,
        req.body.birthdate,
        req.body.nationalID,
        req.body.phone,
        req.body.email,
        req.body.password,
        userUUID = 0,
        adminID = 0
    );
    console.log(newAdmin);
    try {
        const result = await AdminsManager.createAdmin(newAdmin);
        if (result) {
            return res.status(201).json(result)
        }
        return res.status(400).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const registerClient = async (req, res) => {
    const newClient = new Client(
        userID = 0,
        req.body.firstName,
        req.body.lastName,
        req.body.birthdate,
        req.body.nationalID,
        req.body.phone,
        req.body.email,
        req.body.password,
        userUUID = 0,
        clientID = 0,
        req.body.defaultLatitude,
        req.body.defaultLongitude
    );
    try {
        const result = await ClientsManager.createClient(newClient);
        if (result) {
            return res.status(201).json(result)
        }
        return res.status(400).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

module.exports = { register };