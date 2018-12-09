const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;
const session = require('express-session');
const indexRouter = require('./routes/index');
const User = require('./models/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(
  new FortyTwoStrategy(
    {
      clientID: process.env.FORTYTWO_APP_ID,
      clientSecret: process.env.FORTYTWO_APP_SECRET,
      callbackURL: process.env.FORTYTWO_APP_CALLBACK,
      profileFields: {
        username: 'login',
      },
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ login: profile.username })
        .then(user => cb(null, user.doc))
        .catch(err => cb(err, null));
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(res.locals);
});
module.exports = app;
