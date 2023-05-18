const express = require("express");
const router = express.Router();
const {
  getAllGroups,
  createNewGroup,
  updateGroup,
  getAllGroupsByUserId,
} = require("../../controllers/grupoController");

router.route("/").get(getAllGroups).post(createNewGroup).put(updateGroup);

router.route("/:userId").get(getAllGroupsByUserId)

module.exports = router;
