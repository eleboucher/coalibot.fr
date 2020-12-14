const getStudent = async (studentID, login) =>
  Student.findOrCreate({ id: studentID }, { id: studentID, login });

const getCursus = async (client, cursusID) => {
  const cursus = await Cursus.findOne({ id: cursusID });
  if (!cursus) {
    const newCursus = await client(`/cursus/${cursusID}`);
    return await Cursus.create({
      id: cursusID,
      name: newCursus.data.name,
      slug: newCursus.data.slug,
    });
  }
  return cursus;
};

const fetchCursusUsers = async (client) => {
  let page = 1;
  let res = await client(
    `/cursus_users?page[number]=${page}&page[size]=100&filter[campus_id]=1`
  );
  while (res.data.length !== 0) {
    sails.log(page, JSON.stringify(res.data));
    for (cursusUser of res.data) {
      const cursus = await getCursus(client, cursusUser.cursus_id);
      if (cursus === null || cursus === undefined) {
        continue;
      }
      const student = await getStudent(
        cursusUser.user.id,
        cursusUser.user.login
      );
      await Cursus_user.updateOrCreate(
        {
          student: student.id,
          cursus: cursus.id,
        },
        {
          grade: cursusUser.grade || "",
          level: cursusUser.level,
          skills: cursusUser.skills,
          beginAt: new Date(cursusUser.begin_at),
          endAt: new Date(cursusUser.end_at),
          student: student.id,
          cursus: cursus.id,
        }
      );
    }

    page += 1;
    res = await client(
      `/cursus_users?page[number]=${page}&page[size]=100&filter[campus_id]=1`
    );
    sails.log(page, JSON.stringify(res.data));
  }
};

module.exports = { fetchCursusUsers };
