const pool  = require('./pg.dal');
const bcrypt = require('bcrypt');

const getAuthUsers = async () => {
    try {
        const users = await pool.query('SELECT * FROM user_auth limit 10');
        return users.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

const getAuthUser = async (username) => {
    try {
        const user = await pool.query('SELECT * FROM user_auth WHERE username = $1', [username]);
        return user.rows;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

const addAuthUser = async (firstname, lastname, email, username, password) => {
    try {
        const query = 'INSERT INTO user_auth (first_name, last_name, email, username, password_hash ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [firstname, lastname, email, username, password];
        const newUser = await pool.query(query, values);
        return newUser.rows;
    } catch (error) {
        console.error('Error adding user:', error.stack);
        throw error;
    }
}

const updateAuthUser = async (username, firstname, lastname, email, password) => {
    try {
        const query = 'UPDATE user_auth SET first_name = $2, last_name = $3, email = $4, password_hash = $5 WHERE username = $1 RETURNING *';
        const values = [username, firstname, lastname, email, password];
        const updatedUser = await pool.query(query, values);
        // console.log(updatedUser.rows);
        return updatedUser.rows;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const deleteAuthUser = async (username) => {
    try {
        const query = 'DELETE FROM user_auth WHERE username = $1 RETURNING *';
        const values = [username];
        const deletedUser = await pool.query(query, values);
        // console.log(deletedUser.rows);
        return deletedUser.rows;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

const deleteAllAuthUsers = async () => {
    try {
        const query = 'DELETE FROM user_auth RETURNING *';
        const deletedUsers = await pool.query(query);
        // console.log(deletedUsers.rows);
        return deletedUsers.rows;
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error;
    }
}

const loginAuthUser = async (username, password) => {
    try {
        const user = await pool.query('SELECT * FROM user_auth WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
            if (isValidPassword) {
                return { user_id: user.rows[0].user_id, message: "Logged in successfully" };
            } else {
                return { error: "Invalid Credentials" };
            }
        } else {
            return { error: "Invalid Credentials" };
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = { getAuthUsers, getAuthUser, addAuthUser, updateAuthUser, deleteAuthUser, deleteAllAuthUsers, loginAuthUser};
