const express = require("express");
const router = express.Router();
const {
  getAllNotas,
  getAllNotasByUserId,
  updateNote,
  createNewNote,
} = require("../../controllers/notasController");

router.route("/").get(getAllNotas).post(createNewNote).put(updateNote);

router.route("/:userId").get(getAllNotasByUserId);

module.exports = router;
