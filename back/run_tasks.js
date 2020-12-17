const knex = require("./db/knex");
const coalitionsTasks = require("./tasks/coalitions");
const cursusTasks = require("./tasks/cursus");
const client = require("./api/client");
(async function () {
  await cursusTasks.fetchCursusUsers(client);
  await coalitionsTasks.fetchCoalitionUsers(client);
})();
