const getStudent = async (studentID, login) =>
  Student.findOne({ id: studentID });

const getCoalition = async (client, coalition_id) => {
  const newCoalition = await client(`/coalitions/${coalition_id}`);
  return await Coalition.updateOrCreate(
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
    sails.log(page, JSON.stringify(res.data));
    for (coalitionUser of res.data) {
      const coalition = await getCoalition(client, coalitionUser.coalition_id);
      if (coalition === null || coalition === undefined) {
        continue;
      }
      const student = await getStudent(coalitionUser.user_id);
      if (student === null || student === undefined) {
        continue;
      }
      await Coalition_user.updateOrCreate(
        {
          student: student.id,
          coalition: coalition.id,
        },
        {
          rank: coalitionUser.rank,
          score: coalitionUser.score,
          student: student.id,
          coalition: coalition.id,
        }
      );
    }

    page += 1;
    res = await client(`/coalitions_users?page[number]=${page}&page[size]=100`);
    sails.log(page, JSON.stringify(res.data));
  }
};

module.exports = { fetchCoalitionUsers };
