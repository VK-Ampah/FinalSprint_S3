require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const path = require('path');
// const {getUsers} = require('./services/users');
global.DEBUG = true;

// Initialize express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    // cookie: {
    //     maxAge: 60 * 60 * 1000 // persist session for 1 hour
    // }
}));
// configure views and static files
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('index', { loggedIn: req.session.loggedIn });
});


const signupRouter = require('./routes/signup');
app.use('/signup', signupRouter);

const loginsRouter = require('./routes/signin');
app.use('/signin', loginsRouter);

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

// // Get search page
// app.get('/search', (req, res) => {
//     // Check if the user is logged in
//     if (req.session.loggedIn) {
//         res.render('search');
//     } else {
//         res.redirect('/');
//     }
// });


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);