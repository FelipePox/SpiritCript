const express = require("express");
const router = express.Router();
const {
  getAllGroups,
  createNewGroup,
  updateGroup,
} = require("../../controllers/grupoController");

router.route("/").get(getAllGroups).post(createNewGroup).put(updateGroup);

module.exports = router;
