const Leaderboard = require('../models/leaderboard');

const getLeaderboardByYear = async (req, res) => {
  const { rentree } = req.params;
  const ret = await Leaderboard.find({ rentree }).sort({ level: -1 });
  return res.json(ret);
};

const getLeaderboardByCoalition = async (req, res) => {
  let { coalition } = req.params;
  coalition = coalition.charAt(0).toUpperCase();
  const ret = await Leaderboard.find({ coalition }).sort({ level: -1 });
  return res.json(ret);
};

module.exports = { getLeaderboardByYear, getLeaderboardByCoalition };
