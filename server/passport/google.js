const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../queries/users');

passport.use(new GoogleStrategy({
        clientID: '497897918115-3rfuobm87gkr1888n5jknfmn4mbo3oh4.apps.googleusercontent.com',
        clientSecret: 'A84GotlBCXZVrmYujbxefB3e',
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;

        const google_user = {
            name: profile.displayName,
            email,
            google_id: profile.id,
            img_url: profile.photos[0].value,
            role_id: 1
        }

        try {
            let user = await users.findByEmail(email);

            if (user) {
                google_user.role_id = user.role_id;
                user = await users.update(user.id, google_user);
            } else {
                user = await users.insert(google_user);
            }

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    }
));