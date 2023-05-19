const express = require("express");
const router = express.Router();
const {
  getAllNotas,
  getAllNotasByUserId,
  updateNota,
  createNewNota,
  deleteNota,
} = require("../../controllers/notasController");

router
  .route("/")
  .get(getAllNotas)
  .post(createNewNota)
  .put(updateNota)
  .delete(deleteNota);

router.route("/:userId").get(getAllNotasByUserId);

module.exports = router;
