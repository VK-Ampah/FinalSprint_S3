const pool  = require('./pg.dal');


const getPlayers = async () => {
    try {
        const users = await pool.query('SELECT * FROM players limit 2');
        console.log(users.rows);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// getPlayers().catch(console.dir);

const getPlayersDescription = async (attribute,position) => {
    // const query2 = `SELECT * \
    //     FROM players \
    //     WHERE lower(description) ILIKE lower($1) AND lower(position) = lower($2) \
    //     LIMIT $3 OFFSET $4`;
    const query = `SELECT * \
    FROM players \
    where lower(description) ilike lower($1) and lower(position) = lower($2)\
    limit 20`;
    const values = [`%${attribute}%`,position];
    try {
        const users = await pool.query(query,values);
        console.log(users.rows);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// getPlayersDescription('agile','defender').catch(console.dir);

module.exports = { getPlayers, getPlayersDescription};