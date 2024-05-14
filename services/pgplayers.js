const { get } = require('http');
const pool  = require('./pg.dal');


const getPlayers = async (attribute,position) => {
    try {
        const query = `SELECT * \
        FROM players \
        WHERE lower(description) ILIKE lower($1) AND lower(position) ILIKE lower($2)`;

        const values = [`%${attribute}%`, `%${position}%`];
        const users = await pool.query(query, values);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// getPlayers('a','defender').catch(console.dir);

const getPlayersDescription = async (attribute, position, limit, offset) => {
    const query = `SELECT * \
        FROM players \
        WHERE lower(description) ILIKE lower($1) AND lower(position) ILIKE lower($2) \
        LIMIT $3 OFFSET $4`;

    const values = [`%${attribute}%`, `%${position}%`, limit, offset];
    try {
        const users = await pool.query(query, values);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}


module.exports = { getPlayers, getPlayersDescription};