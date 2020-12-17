const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/fortytwo", passport.authenticate("42"));

router.get("/logged", (req, res) => {
  return res.json({ logged: !!req.user });
});

router.get(
  "/fortytwo/callback",
  passport.authenticate("42", {
    failureRedirect: "/fortytwo",
    successRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

module.exports = router;
