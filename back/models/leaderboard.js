const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  login: String,
  level: Number,
  rentree: String,
  coalition: String,
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
