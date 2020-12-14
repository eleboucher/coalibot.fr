const fiftyMinutes = 50 * 60 * 1000;

const getStudent = async (studentID) =>
  Student.findOne({ id: studentID });

const getCoalition = async (client, coalition_id) => {
  const coalition = await Coalition.findOne({ id: coalition_id });
  const date = new Date();
  if (coalition && date - new Date(coalition.updateAt) < fiftyMinutes) {
    return coalition;
  }
  const newCoalition = await client(`/coalitions/${coalition_id}`);
  await Coalition.updateOrCreate(
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
  return await Coalition.findOne({ id: coalition_id });
};

const fetchCoalitionUsers = async (client) => {
  let page = 1;
  let res = await client(
    `/coalitions_users?page[number]=${page}&page[size]=100`
  );
  while (res.data.length !== 0) {
    for (coalitionUser of res.data) {
      const coalition = await getCoalition(client, coalitionUser.coalition_id);
      if (coalition === null || coalition === undefined) {
        sails.log('coalition not found');
        continue;
      }
      const student = await getStudent(coalitionUser.user_id);
      if (student === null || student === undefined) {
        sails.log('user not found');
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
