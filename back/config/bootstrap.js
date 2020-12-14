/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const cursus = require("../api/tasks/cursus");
const coalition = require("../api/tasks/coalition");

var cron = require("node-cron");
module.exports.bootstrap = async function (cb) {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  cron.schedule("43 */1 * * *", async () => {
    sails.log("running tasks");
    const { request42 } = require("../api/client/fortytwo");
    await cursus.fetchCursusUsers(request42);
    await coalition.fetchCoalitionUsers(request42);
  });
  cb();
};
