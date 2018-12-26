const express = require('express');
const passport = require('passport');
const isLogged = require('../helpers/logged');
const leaderboard = require('./leaderboard');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.send({ hello: true }));

router.get('/health', (req, res) => res.send({ alive: true }));

router.get('/logged', (req, res) => {
  res.json({ logged: !!req.user });
});

router.get('/login', passport.authenticate('42'));

router.get(
  '/login/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3001/');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3001/');
});

router.use('/leaderboard', leaderboard);

module.exports = router;
