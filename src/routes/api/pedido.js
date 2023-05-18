const express = require("express");
const router = express.Router();

const {
    getAllPedidoOracaoByUserId,
    updatePedidoOracao,
    createNewPedidoOracao,
    deletePedidoOracao,
  } = require("../../controllers/pedidoOracaoController");

  router.route('/').post(createNewPedidoOracao).put(updatePedidoOracao)
  router.route('/:userId').get(getAllPedidoOracaoByUserId);

  module.exports = router;