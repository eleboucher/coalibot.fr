/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET /api/v1/auth/fortytwo": {
    controller: "LoginController",
    action: "FortyTwoAuth",
  },
  "GET /api/v1/auth/fortytwo/callback": {
    controller: "LoginController",
    action: "FortyTwoCallback",
  },
  "GET /api/v1/auth/logged": {
    controller: "LoginController",
    action: "Logged",
  },
  "GET /api/v1/cursus": {
    controller: "CursusController",
    action: "ListCursus",
  },
  "GET /api/v1/cursus/:id": {
    controller: "CursusController",
    action: "ListStartingPeriodByCursus",
  },
  "GET /api/v1/cursus/:cursus_id/:starting_period": {
    controller: "CursusController",
    action: "ListStudentByStartingPeriodAndCursus",
  },
};
