const AdminsManager = require("../models/admin.js");
const { UsersManager } = require ("../models/user.js");

/*
The getUsers function has optional query parameters: admin, client, delivery
If the valid query parameter was provided it routes to the intender Manager
If no valid query parameter was provided, all users are returned
*/
const getUsers = async (req, res) => {
    let result;
    try {
        if (req.query.role) {
            switch(req.query.role) {
                case ("admin"):
                    result = await AdminsManager.getAdmins();
                    break;
            }
        }
        if (!result) {
            result = await UsersManager.getUsers();
        }
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const getUserById = async (req, res) => {
    const requestedId = parseInt(req.params.id);
    try {
        const result = await UsersManager.getUserById(requestedId);
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const createUser = async (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        nationalID: req.body.nationalID,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    try{
        const result = await UsersManager.createUser(newUser)
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

const updateUser = (req, res) => {
    return res.status(418).send("Not implemented");
}

const deleteUser = (req, res) => {
    return res.status(418).send("Not implemented");
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };