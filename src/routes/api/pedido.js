const express = require("express");
const router = express.Router();

const {
  getAllPedidoOracaoByUserId,
  updatePedidoOracao,
  createNewPedidoOracao,
  deletePedidoOracao,
} = require("../../controllers/pedidoOracaoController");

router
  .route("/")
  .post(createNewPedidoOracao)
  .put(updatePedidoOracao)
  .delete(deletePedidoOracao);

router.route("/:userId").get(getAllPedidoOracaoByUserId);

module.exports = router;
