const knex = require("../db/knex");
const updateOrCreate = require("../helpers/create_or_update");
const findOrCreate = require("../helpers/find_or_create");

const fiftyMinutes = 50 * 60 * 1000;

const getStudent = async (studentID) =>
  knex("students").where({ id: studentID });

const getCoalition = async (client, coalition_id) => {
  const coalition = await knex("coalitions").where({ id: coalition_id })[0];
  const date = new Date();
  if (coalition && date - new Date(coalition.update_at) < fiftyMinutes) {
    return coalition;
  }
  const newCoalition = await client(`/coalitions/${coalition_id}`);
  return await updateOrCreate(
    "coalitions",
    {
      id: coalition_id,
    },
    {
      id: coalition_id,
      name: newCoalition.data.name,
      slug: newCoalition.data.slug,
      color: newCoalition.data.color,
      rank: newCoalition.data.rank,
      score: newCoalition.data.score,
    }
  );
};

const fetchCoalitionUsers = async (client) => {
  let page = 1;
  let res = await client(
    `/coalitions_users?page[number]=${page}&page[size]=100`
  );
  while (res.data.length !== 0) {
    for (coalitionUser of res.data) {
      try {
        const student = await getStudent(coalitionUser.user_id);
        if (!student[0]) {
          console.debug(`user not found ${coalitionUser.user_id}`);
          continue;
        }

        const coalition = await getCoalition(
          client,
          coalitionUser.coalition_id
        );
        if (coalition === null || coalition === undefined) {
          console.debug(`coalition not found ${coalitionUser.coalition_id}`);
          continue;
        }

        await updateOrCreate(
          "coalitions_users",
          {
            id: coalitionUser.id,
          },
          {
            id: coalitionUser.id,
            rank: coalitionUser.rank,
            score: coalitionUser.score,
            student_id: student[0].id,
            coalition_id: coalition.id,
          }
        );
        console.debug(`coalitions_users created ${cursusUser.id}`);
      } catch (e) {
        console.error(e);
        continue;
      }
    }
    page += 1;
    res = await client(`/coalitions_users?page[number]=${page}&page[size]=100`);
    console.log(page, JSON.stringify(res.data));
  }
};

module.exports = { fetchCoalitionUsers };
