/**
 * CursusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const query = `SELECT to_char(cursus_users."beginAt",'YYYY') AS starting_period FROM cursus_users WHERE cursus = $1 ORDER BY cursus_users."beginAt"`;

module.exports = {
  ListCursus: async (req, res, next) => {
    const cursus = await Cursus.find({});
    res.json(cursus);
  },
  ListStartingPeriodByCursus: async (req, res, next) => {
    const cursus = await sails
      .getDatastore()
      .sendNativeQuery(query, [req.params.id]);
    const ret = cursus.rows.map((e) => e.starting_period);
    res.json({ starting_periods: Array.from(new Set(ret)) });
  },
  ListStudentByStartingPeriodAndCursus: async (req, res, next) => {
    const cursus = await Cursus_user.find({
      beginAt: {
        ">": new Date(req.params.starting_period, 0, 1),
        "<": new Date(int(req.params.starting_period) + 1, 0, 1),
      },
      cursus: req.params.cursus_id,
    })
      .sort("level DESC")
      .populate("student");
    res.json(cursus);
  },
};
