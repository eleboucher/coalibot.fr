const knex = require("../db/knex");
const cursusController = {
  ListCursus: async (req, res) => {
    const cursus = await knex("cursus");
    res.json(cursus);
  },
  ListStartingPeriodByCursus: async (req, res) => {
    const cursus = await knex("cursus_users")
      .select(knex.raw(`to_char(begin_at,'YYYY') as starting_period`))
      .where({ cursus_id: req.params.id })
      .orderBy("begin_at");
    const ret = cursus.map((e) => e.starting_period);
    res.json({ starting_periods: Array.from(new Set(ret)) });
  },
  ListStudentByStartingPeriodAndCursus: async (req, res) => {
    const cursus = await knex("cursus_users")
      .select(
        "students.id as id",
        "students.login as login",
        "cursus_users.level as level",
        "cursus_users.grade as grade",
        "coalitions_users.score as score",
        "coalitions_users.rank as coalition_rank"
      )
      .where({
        cursus_id: req.params.cursus_id,
      })
      .andWhereBetween("begin_at", [
        new Date(req.params.starting_period, 0, 1),
        new Date(parseInt(req.params.starting_period) + 1, 0, 1),
      ])
      .join("students", "cursus_users.student_id", "students.id")
      .leftOuterJoin(
        "coalitions_users",
        "coalitions_users.student_id",
        "cursus_users.student_id"
      )
      .leftOuterJoin(
        "coalitions",
        "coalitions.id",
        "coalitions_users.coalition_id"
      ).orderBy("cursus_users.level", "desc");

    res.json(cursus);
  },
};

module.exports = cursusController;
