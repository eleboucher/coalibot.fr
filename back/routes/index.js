const express = require("express");
const auth = require("./auth");
const cursus = require("./cursus");
const islogged = require("../middlewares/is_logged");
const router = express.Router();

router.use("/auth", auth);
router.use("/cursus", islogged, cursus);

module.exports = router;
