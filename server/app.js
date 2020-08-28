require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {
    checkAuthHeaderSetUser,
    checkAuthHeaderSetUserUnAuthorized,
    notFound,
    errorHandler
} = require('./middlewares/index');
const cors = require('cors');
const passport = require('passport');

const auth = require('./auth');

const app = express();
const api = require('./api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use(checkAuthHeaderSetUser);

//routes

app.get('/', (req, res) => {
    res.json({
        message: "Hello lad!  node env:" + process.env.NODE_ENV + "   token:" + process.env.TOKEN_SECRET 
    })
});

app.use('/auth', auth);
app.use('/api/v1', api);

////////
app.use(notFound);
app.use(errorHandler);

module.exports = app;