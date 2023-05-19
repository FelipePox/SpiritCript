const { PedidoOracao } = require("../../src/Models/PedidoOracao");

const getAllPedidoOracaoByUserId = async (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "UserId parameter is required" });

  const pedidoOracao = await PedidoOracao.find({
    userId: userId,
  }).exec();

  res.json({ pedidoOracao: pedidoOracao });
};

const createNewPedidoOracao = async (req, res) => {
  const { pedido, userId } = req.body;

  if (!pedido || !userId) {
    return res.status(400).json({ message: "Pedido and UserId are required" });
  }

  try {
    const result = await PedidoOracao.create({
      pedido: pedido,
      userId: userId,
    });

    res.status(200).json(result);
  } catch {
    console.log(err);
  }
};

const updatePedidoOracao = async (req, res) => {
  const { id, pedido, userId } = req.body;

  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const foundPedido = await PedidoOracao.findOne({ _id: id }).exec();

  if (!foundPedido) {
    return res.status(204).json({ message: "No pedido matches ID" + id });
  }

  if (pedido) foundPedido.pedido = pedido;
  if (userId) foundPedido.userId = userId;

  const result = await pedido.save();
  res.json(result);
};

const deletePedidoOracao = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const foundPedido = await PedidoOracao.findOne({ _id: id });
  if (!foundPedido)
    return res.status(204).json({ message: "No pedido matches ID" + id });

  const result = await PedidoOracao.deleteOne({ _id: id });
  res.json(result);
};

module.exports = {
  updatePedidoOracao,
  createNewPedidoOracao,
  getAllPedidoOracaoByUserId,
  deletePedidoOracao,
};
