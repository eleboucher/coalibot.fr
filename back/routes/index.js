const express = require("express");
const auth = require("./auth");
const cursus = require("./cursus");

const router = express.Router();

router.use("/auth", auth);
router.use("/cursus", cursus);

module.exports = router;
