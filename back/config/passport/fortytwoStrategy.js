const passport = require("passport");
const FortyTwoStrategy = require("passport-42").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FortyTwoStrategy(
    {
      clientID: process.env.FORTYTWO_APP_ID,
      clientSecret: process.env.FORTYTWO_APP_SECRET,
      callbackURL: process.env.FORTYTWO_APP_CALLBACK,
      profileFields: {
        username: "login",
      },
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate(
        { login: profile.username },
        { login: profile.username }
      ).exec(async (err, user, wasCreated) => {
        if (err) {
          return done(err, null);
        }

        if (wasCreated) {
          sails.log("Created a new user: " + user.login);
        } else {
          sails.log("Found existing user: " + user.login);
        }
      });
      return done(null, profile);
    }
  )
);
