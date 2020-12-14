/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require("passport");
const { Sails } = require("sails");

module.exports = {
  FortyTwoAuth: (req, res, next) => {
    passport.authenticate("42")(req, res, next);
  },
  FortyTwoCallback: (req, res, next) => {
    passport.authenticate(
      "42",
      (err, user) => {
        if (err) {
          console.error(err);
          res.json(err);
          return;
        }
        req.session.user = user;
        res.redirect("http://localhost:8080");
      },
      { failureRedirect: "/api/v1/auth/fortytwo" }
    )(req, res, next);
  },
  Logged: (req, res, next) => {
    res.json({ logged: !!req.session.user });
  },
};
