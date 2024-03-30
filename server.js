const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = 3000;
const path = require('path');
// const {getUsers} = require('./services/users');
global.DEBUG = false;

// configure views and static files
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // moved after express.urlencoded
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('index');
});

const loginsRouter = require('./routes/logins');
app.use('/logins', loginsRouter);


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);