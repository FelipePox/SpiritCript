const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoOracaoSchema = new Schema({
  pedido: { type: String, required: true },
  userId: { type: String, required: true },
  allowed: { type: [String], required: false },
});

const PedidoOracao = mongoose.model("PedidoOracao", pedidoOracaoSchema);
module.exports = { PedidoOracao };
