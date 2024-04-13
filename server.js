require('dotenv').config();
const { logMiddleware,logMiddelwareSignIn,logMiddelwareSignUp,logMiddelwareHome} = require('./logger');
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


const homeRouter = require('./routes/home');
app.use('/',logMiddelwareHome, homeRouter);

const signupRouter = require('./routes/signup');
app.use('/signup', logMiddelwareSignUp, signupRouter);

const loginsRouter = require('./routes/signin');
app.use('/signin', logMiddelwareSignIn,  loginsRouter);

const searchRouter = require('./routes/search');
app.use('/search', logMiddleware, searchRouter);


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);