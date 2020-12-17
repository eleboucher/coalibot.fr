const express = require("express");
const cursusController = require("../controllers/cursusController");
const router = express.Router();

router.get("/", cursusController.ListCursus);
router.get("/:id", cursusController.ListStartingPeriodByCursus);
router.get(
  "/:cursus_id/:starting_period",
  cursusController.ListStudentByStartingPeriodAndCursus
);

module.exports = router;
