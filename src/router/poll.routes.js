const express = require("express");

const router = express.Router();

const {
  createQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
  incrementVotes,
  viewQuestion,
} = require("../controller/poll.controller");

router.post("/questions/create", createQuestion);
router.post("/options/create", addOption);
router.get("/questions/:id/delete", deleteQuestion);
router.get("/options/:id/delete", deleteOption);
router.get("/options/:id/add_vote", incrementVotes);
router.get("/questions/:id", viewQuestion);

module.exports = router;
