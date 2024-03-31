const pool  = require('./pg.dal');


const getUsers = async () => {
    try {
        const users = await pool.query('SELECT * FROM players limit 2');
        console.log(users.rows);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

getUsers().catch(console.dir);