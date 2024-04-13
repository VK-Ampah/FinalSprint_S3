const router = require('express').Router();
// const flash = require('express-flash');
const { getAuthUsers, loginAuthUser, } = require('../services/pg.authdb');


// render signin page
router.get('/', async (req, res) => {
    try {
        if (DEBUG) console.log('GET /signin');
        const loggedIn = req.session.loggedIn || false;
        res.render('signin', { loggedIn });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Error getting users');
    }
}
);

// post signin page and compare input password to hashed password
router.post('/', async (req, res) => {
    // console.log('Session ID:', req.sessionID); // Log the session ID
    // console.log('Session:', req.session); // Log the session object
    try {
        if (DEBUG) console.log('POST /logins');
        const { username, password } = req.body;
        const user = await loginAuthUser(username, password);
        req.session.username = username;
        req.session.user_id = user.user_id;     
        if (user.error) {
            res.status(400).send('Invalid Credentials');
        } else {
            // Set a session variable to indicate that the user is logged in
            req.session.loggedIn = true;
            res.redirect('/search');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while logging in');
    }
});
// Sign out route
router.get('/signout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/signin');
        }

        res.clearCookie('sid');
        res.redirect('/');
    });
});

module.exports = router;




