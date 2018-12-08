const express = require('express');
const passport = require('passport');
const isLogged = require('../helpers/logged');
const leaderboard = require('./leaderboard');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.send({ hello: true }));

router.get('/health', (req, res) => res.send({ alive: true }));

router.get('/logged', isLogged, (req, res) => res.send({ logged: true }));

router.get('/login/', passport.authenticate('42'));

router.get(
  '/login/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use('/leaderboard', leaderboard);

module.exports = router;
