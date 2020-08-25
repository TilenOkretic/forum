const passport = require('passport');
const express = require('express');
require('../passport/google');
const {
    create
} = require('./utils');

const router = express.Router();

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err) {
            return next(err);
        }
        try {
            const token = await create(user);
            console.log(token);
            res.json({
                token
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});


module.exports = router;