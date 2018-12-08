const express = require('express');
const passport = require('passport');
const isLogged = require('../helpers/logged');
const leaderboard = require('../controllers/leaderboard');

const router = express.Router();
router.get('/getByYear/:rentree', isLogged, leaderboard.getLeaderboardByYear);

router.get('/getByCoalition/:coalition', isLogged, leaderboard.getLeaderboardByCoalition);

module.exports = router;
