const express = require("express");
const router = express.Router();
const {
  getAmigosByUserId,
  addAmigos,
  retirarAmigo,
} = require("../../controllers/amigosController");

router.route("/").get(getAmigosByUserId);

router.route("/:add").post(addAmigos);

router.route("/:remove").delete(retirarAmigo);

module.exports = router;
