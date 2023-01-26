const authenticate = (req, res) => {
    const requestUsername = req.body.username;
    const requestPassword = req.body.password;
    const userIndex = users.findIndex(user => user.username === requestUsername);
    if (userIndex !== -1) {
        if (requestPassword === users[userIndex].password) {
            return res.status(200).json(
                {
                    username: users[userIndex].password,
                    id: users[userIndex].id,
                    role: users[userIndex].role
                });
        }
    }
    return res.status(401).send("Incorrect user or password");
}

module.exports = { authenticate };