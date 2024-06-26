const router = require('express').Router();

const { getPlayersDescription, getPlayers } = require('../services/pgplayers'); 
const { getAllPlayers,getPlayersByDescription } = require('../services/mdbusers'); 


// get search page
router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        // If not logged in, redirect to the login or signup page
        return res.redirect('/signup');
    }
    if (DEBUG) console.log('GET /search')

    // Extract search criteria and database selections from the session storage
    const attribute = req.session.attribute || '';
    const position = req.session.position || '';
    const db = req.session.database || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let results = [];
    let totalPages = 0;
    let totalCount = 0;
    let searchSubmitted = false;

    const date = new Date();

    try {
        if (db === 'mongodb' && req.query.page) {
            console.log('GET from mongodb')
            const mongoResults = await getAllPlayers(attribute, position);
            totalCount = mongoResults.length;
            results = await getPlayersByDescription(req.session.attribute, req.session.position, limit, offset);
            searchSubmitted = req.session.searchSubmitted;
   
            console.log('mongo search submitted: ',searchSubmitted)
            // console.log(results[0])
        } else if (db === 'postgres' && req.query.page) {
            console.log('GET from postgres')
            const pgResults = await getPlayers(attribute, position);
            totalCount = pgResults.length;
            results = await getPlayersDescription(req.session.attribute, req.session.position, limit, offset);
                searchSubmitted = req.session.searchSubmitted;
     
            console.log('pg search submitted: ',searchSubmitted)

        } else if (db === 'all' && req.query.page) {
            const mongoResults = await getAllPlayers(attribute, position);
            const pgResults = await getPlayers(attribute, position);
            const combinedResults = mongoResults.concat(pgResults);        
            searchSubmitted = req.session.searchSubmitted;            
           
            totalCount = combinedResults.length;
            console.log('GET from both')

            // Manual pagination for combined dataset
            results = combinedResults.slice(offset, offset + limit);
            totalPages = Math.ceil(combinedResults.length / limit);
 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Error fetching data' });
    }

    // Render the search results page with pagination
    res.render('search', {
        loggedIn: req.session.loggedIn,
        results,
        page,
        limit,
        db,
        totalCount,
        searchSubmitted,
        totalPages 
    });
});

// post search page
router.post('/', async (req, res) => {
    if (DEBUG) console.log('POST /search')
    if (!req.session.loggedIn) {
        return res.redirect('/signup');
    }

    // Extract search criteria and database selection from the form submission and store in session storage
    const { attribute, position, database } = req.body;
    req.session.attribute = attribute;
    req.session.position = position;
    req.session.database = database;
    const searchSubmitted = true;
    req.session.searchSubmitted = searchSubmitted;

    // Redirect to GET route to display initial results// page 1
    res.redirect(`/search?db=${database}&page=1`);
});

module.exports = router;