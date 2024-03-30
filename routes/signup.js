const router = require('express').Router();
const bcrypt = require('bcrypt');

const { addAuthUser } = require('../services/pg.authdb');

// get signup page
router.get('/', async (req, res) => {
    try {
        if (DEBUG) console.log('GET /signup');
        res.render('signup');
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Error getting users');
    }
}
);
// post signup page
router.post('/', async (req, res) => {
    try {
        if (DEBUG) console.log('POST /signup');
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const newUser = await addAuthUser(req.body.firstname, req.body.lastname, req.body.email, req.body.username, hashedPassword );
        console.log(req.body);
        console.log(newUser);
        // res.redirect('/');
        res.send('User created');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while creating the user');
    }
});

module.exports = router;