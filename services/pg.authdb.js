const pool  = require('./pg.dal');

const getAuthUsers = async () => {
    try {
        const users = await pool.query('SELECT * FROM user_auth limit 2');
        console.log(users.rows);
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

const getAuthUser = async (username) => {
    try {
        const user = await pool.query('SELECT * FROM user_auth WHERE username = $1', [username]);
        console.log(user.rows);
        return user.rows;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

const addAuthUser = async (firstname, lastname, username, password, email) => {
    try {
        const newUser = await pool.query(
            'INSERT INTO user_auth (firstname, lastname, username, password_hash, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstname, lastname, username, password, email]
        );
        console.log(newUser.rows);
        return newUser.rows;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

module.exports = { getAuthUsers, getAuthUser, addAuthUser};

// getAuthUsers().catch(console.dir);