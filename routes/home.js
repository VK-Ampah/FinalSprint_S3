// const { logMiddelwareHome } = require('../logger');
const router = require('express').Router();
const { getAuthUsers } = require('../services/pg.authdb');

// router.use(logMiddelwareHome);

// render home page

router.get('/', async (req, res) => {
    try {
        if (DEBUG) console.log('GET /');
        
        const loggedIn = req.session.loggedIn || false;
        const users = await getAuthUsers();
        res.render('index', { loggedIn, users});
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Error getting users');
    }
}
);
module.exports = router;