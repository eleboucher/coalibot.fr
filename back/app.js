const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const indexRouter = require("./routes/index");
const passport = require("passport");
const FortyTwoStrategy = require("passport-42").Strategy;
const knex = require("./db/knex");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1); // trust first proxy
if (process.env.NODE_ENV == "production") {
  const redis = require("redis");
  const session = require("express-session");

  let RedisStore = require("connect-redis")(session);
  let redisClient = redis.createClient(process.env.REDIS_URL);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
} else {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
}

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
    (accessToken, refreshToken, profile, cb) => {
      knex
        .transaction(async (trx) => {
          let user = await trx("users").where("login", profile.username);
          if (user.length === 0) {
            await trx("users").insert({ login: profile.username });

            user = await trx("users").where("login", profile.username);
          }
          return cb(null, user);
        })
        .catch((err) => cb(err, null));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

module.exports = app;
