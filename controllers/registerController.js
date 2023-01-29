const AdminsManager = require ("../models/admin.js");

const register = async (req, res) => {
    const requestUsername = req.body.username;
    const requestPassword = req.body.password;
    return res.status(418).send("Not implemented");
}

const getAdmins = async (req, res) => {
    const result = await AdminsManager.getAdmins();
    return res.status(200).json(result);
}

module.exports = { register, getAdmins };