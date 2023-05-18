const express = require("express");
const router = express.Router();
const {
  getAllGroups,
  createNewGroup,
} = require("../../controllers/grupoController");

router.route("/").get(getAllGroups).post(createNewGroup);

module.exports = router;
