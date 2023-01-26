const authenticate = (req, res) => {
    const requestUsername = req.body.username;
    const requestPassword = req.body.password;
    return res.status(418).send("Not implemented");
}

module.exports = { authenticate };