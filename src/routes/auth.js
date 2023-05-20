const express = require("express");
const router = express.Router();
const { handleLogin, deleteUser } = require("../controllers/authController");

router.route("/").post(handleLogin).delete(deleteUser);

module.exports = router;
