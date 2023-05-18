const {PedidoOracao} =  require('../../src/Models/PedidoOracao')

const getAllPedidoOracaoByUserId = async (req, res) => {
    if (!req?.body?.userId)
      return res.status(400).json({ message: "UserId parameter is required" });
  
    const pedidoOracao = await PedidoOracao.find({ userId: req.body.userId }).exec();
  
    res.json({ pedidoOracao: pedidoOracao });
  };


const createNewPedidoOracao = async (req, res) => {
    if (!req?.body?.pedido || !req?.body?.userId) {
      return res.status(400).json({ message: "Pedido and UserId are required" });
    }
  
    try {
      const result = await PedidoOracao.create({
        pedido: req.body.pedido,
        userId: req.body.userId
      });
  
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePedidoOracao = async (req, res) => {
    if (!req?.body?.id)
      return res.status(400).json({ message: "ID parameter is required" });
  
    const pedido = await PedidoOracao.findOne({ _id: req.body.id }).exec();
  
    if (!pedido) {
      return res
        .status(204)
        .json({ message: "No group matches ID" + req.body.id });
    }
  
    if (req.body?.pedido) group.name = req.body.name;
    if (req.body?.userId) group.userId = req.body.userId;
  
    const result = await pedido.save();
    res.json(result);
  };

  
  module.exports = {
    updatePedidoOracao,
    createNewPedidoOracao,
    getAllPedidoOracaoByUserId
  };