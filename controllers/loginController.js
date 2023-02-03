const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminsManager } = require("../models/admin");
const { ClientsManager } = require("../models/client");
const { DeliverersManager } = require("../models/delivery");
const { UsersManager } = require("../models/user");

const getUserRole = async (userUuid) => {
    let result = await ClientsManager.getClientByUuid(userUuid);
    if (result) {
        return ("client");
    }
    result = await DeliverersManager.getDelivererByUuid(userUuid);
    if (result) {
        return ("delivery");
    }
    result = await AdminsManager.getAdminByUuid(userUuid);
    if (result) {
        return ("admin");
    }
    return ("");
}

const authenticate = async (req, res) => {
    const requestEmail = req.body.email;
    const requestPassword = req.body.password;
    try {
        const result = await UsersManager.getUserByEmailOrNationalId(requestEmail);
        if (!result) {
            return res.status(400).json({ error: "Incorrect email or password" });
        }
        const isCorrectPassword = await bcrypt.compare(requestPassword, result.password);
        if (isCorrectPassword) {
            const userRole = await getUserRole(result.userUUID);
            if (!userRole) {
                throw new Error;
            }
            const payload = {
                userUUID: result.userUUID,
                userRole: userRole
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
            return res.status(200).json({
                token: token,
                userUUID: result.userUUID,
                userRole: userRole
            });
        } else {
            return res.status(400).json({ error: "Incorrect email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Database error occurred" })
    }
}

const confirmAuthorization = (req, res) => {
    return res.status(200).json({ userRole: req.user.userRole });
}

module.exports = { authenticate, confirmAuthorization };