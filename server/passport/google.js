const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../queries/users');

const {
    setAdminIfNotExists
} = require('../auth/utils');

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;

        const google_user = {
            name: profile.displayName,
            email,
            google_id: profile.id,
            img_url: profile.photos[0].value,
            role_id: 2
        }

        try {
            let user = await users.findByEmail(email);

            if (user) {
                google_user.role_id = user.role_id;
                user = await users.update(user.id, google_user);
            } else {
                const admins = await users.findAdmins();
                console.log(admins);
                if (admins.length === 0) {
                    google_user.role_id = 1;
                }
                console.log('fist user', user);
                user = await users.insert(google_user);
            }

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    }
));