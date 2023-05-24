const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoOracaoSchema = new Schema({
  pedido: { type: String, required: true },
  userId: { type: String, required: true },
});

const PedidoOracao = mongoose.model("PedidoOracao", pedidoOracaoSchema);
module.exports = { PedidoOracao };
