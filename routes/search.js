const router = require('express').Router();

// get search page
router.get('/', (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        res.render('search', { loggedIn: req.session.loggedIn });
    } else {
        res.redirect('/signup');
    }
});

module.exports = router;