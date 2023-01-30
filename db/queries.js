const { Pool } = require("pg");

const pool = new Pool();

const query = async (text, params) => {
    console.log(text);
    try {
        const queryResponse = await pool.query(text, params);
        return queryResponse.rows;
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { query }