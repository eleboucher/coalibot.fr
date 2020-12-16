const knex = require("../db/knex");
const updateOrCreate = require("../helpers/create_or_update");
const findOrCreate = require("../helpers/find_or_create");

const getStudent = async (studentID, login) =>
  findOrCreate("students", { id: studentID }, { id: studentID, login });

const getCursus = async (client, cursusID) => {
  let cursus = await knex("cursus").where({ id: cursusID });
  if (cursus.length === 0) {
    const newCursus = await client(`/cursus/${cursusID}`);
    cursus = await knex("cursus").insert({
      id: cursusID,
      name: newCursus.data.name,
      slug: newCursus.data.slug,
    });
  }
  return cursus[0];
};

const fetchCursusUsers = async (client) => {
  let page = 1;
  let res = await client(
    `/cursus_users?page[number]=${page}&page[size]=100&filter[campus_id]=1`
  );
  while (res.data.length !== 0) {
    try {
      console.log(page, JSON.stringify(res.data));
      for (cursusUser of res.data) {
        const cursus = await getCursus(client, cursusUser.cursus_id);
        if (cursus === null || cursus === undefined) {
          console.debug("cursus not found");
          continue;
        }
        const student = await getStudent(
          cursusUser.user.id,
          cursusUser.user.login
        );
        await updateOrCreate(
          "cursus_users",
          {
            student_id: student.id,
            cursus_id: cursus.id,
          },
          {
            id: cursusUser.id,
            grade: cursusUser.grade || "",
            level: cursusUser.level,
            begin_at: new Date(cursusUser.begin_at),
            end_at: new Date(cursusUser.end_at),
            student_id: student.id,
            cursus_id: cursus.id,
          }
        );
      }

      page += 1;
      res = await client(
        `/cursus_users?page[number]=${page}&page[size]=100&filter[campus_id]=1`
      );
    } catch (e) {
      console.error(e);
    }
  }
};

module.exports = { fetchCursusUsers };
