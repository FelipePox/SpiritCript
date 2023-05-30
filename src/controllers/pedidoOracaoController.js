const { PedidoOracao } = require("../../src/Models/PedidoOracao");
const { User } = require("../Models/User");
const { Amigos } = require("../Models/Amigos");
const { SendEmail } = require("../utils/emailSend");

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

  const USER = await User.findOne({ _id: userId });
  const USERNAME = USER.username;

  const foundAmigos = await Amigos.findOne({ userId: userId });

  const allowedEmails = foundAmigos.amigos.map((amigo) => amigo.amigoEmail);

  try {
    const result = await PedidoOracao.create({
      pedido: pedido,
      userId: userId,
      allowed: allowedEmails,
    });

    SendEmail(
      "SpiritScript - Um amigo seu acabou de postar um pedido!",
      `<h1>Nova nota!</h1><p>Seu amigo ${USERNAME} acabou de postar um pedido de oração! Clique <a href="https://www.youtube.com/watch?v=pfU0QORkRpY">aqui</a> para entrar na plataforma e vê-lo!</p>`,
      allowedEmails
    );

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
