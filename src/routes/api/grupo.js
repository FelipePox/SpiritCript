const express = require("express");
const router = express.Router();
const {
  getAllGrupos,
  createNewGrupo,
  updateGrupo,
  getAllGruposByUserId,
  deleteGrupo,
  getGrupoById,
} = require("../../controllers/grupoController");

router
  .route("/")
  .get(getAllGrupos)
  .post(createNewGrupo)
  .put(updateGrupo)
  .delete(deleteGrupo);

router.route("/:userId").get(getAllGruposByUserId);

router.route("/:id").get(getGrupoById);

module.exports = router;
