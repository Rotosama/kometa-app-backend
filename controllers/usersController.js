const db = require("../db/queries");

const allUsers = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users ORDER BY userid ASC");
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

module.exports = { allUsers };