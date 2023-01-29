const { UsersManager } = require ("../models/user.js");

const getUsers = async (req, res) => {
    try {
        const result = await UsersManager.getUsers();
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