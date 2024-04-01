const router = require('express').Router();
const { getPlayers, getPlayersDescription } = require('../services/pgplayers');

// get search page
router.get('/', (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        console.log('GET /search')
        // const players = getPlayersDescription(req.query.attribute, req.query.position);
        res.render('search', { loggedIn: req.session.loggedIn, results:[]});
    } else {
        res.redirect('/signup');
    }
});

router.post('/', async (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        console.log('POST /search')
        console.log(req.body.position);
        console.log(req.body.attribute);
        console.log(req.query);
        console.log(req.body);
        const players = await getPlayersDescription(req.body.attribute, req.body.position);
        console.log(players);
        res.render('search', { loggedIn: req.session.loggedIn, results:players});
    } else {
        res.redirect('/signup');
    }
}
);


module.exports = router;