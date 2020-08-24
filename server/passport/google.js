const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: '497897918115-3rfuobm87gkr1888n5jknfmn4mbo3oh4.apps.googleusercontent.com',
        clientSecret: 'A84GotlBCXZVrmYujbxefB3e',
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
       console.log(profile);
       return cb(new Error('test'));
    }
));