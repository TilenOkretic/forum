const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const {
    notFound,
    errorHandler
} = require('./middlewares/index');

require('dotenv').config();
const auth = require('./auth');

const app = express();

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

//routes

app.get('/', (req, res) => {
    res.json({
        message: "Hello lad!"
    })
});

app.use('/auth', auth);

////////
app.use(notFound);
app.use(errorHandler);

module.exports = app;