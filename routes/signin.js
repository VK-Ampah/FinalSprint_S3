const router = require('express').Router();

const { getAuthUsers, loginAuthUser, } = require('../services/pg.authdb');

router.get('/', async (req, res) => {
    try {
        if (DEBUG) console.log('GET /logins');
        res.render('signin');
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Error getting users');
    }
}
);

// const express = require('express');
// const bcrypt = require('bcrypt');
// // Ensure you have the db.js file set up
// const app = express();
// app.use(express.json());


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

router.post('/', async (req, res) => {
    try {
        if (DEBUG) console.log('POST /logins');
        const { username, password } = req.body;
        const user = await loginAuthUser(username, password);
        if (user.error) {
            res.status(400).send('Invalid Credentials');
        } else {
            res.json(user);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while logging in');
    }
}
);

module.exports = router;