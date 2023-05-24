const { Amigos } = require("../models/Amigos");
const { User } = require("../models/User");

const getAmigosByUserId = async (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(500).json({ message: "UserId parameter is required" });

  const foundAmigos = await Amigos.findOne({ userId: userId });
  res.status(200).json(foundAmigos);
};

const createAmigos = async (userId) => {
  if (!userId) return { message: "UserId parameter is required" };

  try {
    const result = await Amigos.create({
      userId: userId,
    });

    return result;
  } catch {
    console.log(err);
  }
};

const addAmigos = async (req, res) => {
  const { userId, amigo } = req.body;
  if (!userId || !amigo)
    return res.status(500).json({ message: "All parameters are required" });

  const foundAmigos = await Amigos.findOne({
    userId: userId,
  });
  if (!foundAmigos)
    return res.status(204).json({ message: "No amigos matches ID" + userId });

  const AmigoToAdd = await User.findOne({ email: amigo });

  if (AmigoToAdd && foundAmigos) {
    const amigoObject = {
      amigoNome: AmigoToAdd.username,
      amigoEmail: AmigoToAdd.email,
    };

    foundAmigos.amigos.push(amigoObject);

    const result = await foundAmigos.save();
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(204).json({ message: "No User with the provided email found" });
  }
};

const deleteGrupoDeAmigos = async (userId) => {
  const foundAmigos = await Amigos.findOne({ userId: userId });
  if (!foundAmigos) return { message: "No amigos matches ID" + userId };

  const result = await Amigos.deleteOne({ userId: userId });

  return result;
};

const retirarAmigo = async (req, res) => {
  const { userId, amigo } = req.body;
  const foundAmigos = await Amigos.findOne({ userId: userId });
  if (!foundAmigos)
    return res.status(204).json({ message: "No amigos matches ID" + userId });

  foundAmigos.amigos = foundAmigos.amigos.filter((item) => {
    if (item.amigoEmail !== amigo) return item;
  });

  const result = await foundAmigos.save();
  res.status(200).json(result);
};

module.exports = {
  getAmigosByUserId,
  createAmigos,
  addAmigos,
  deleteGrupoDeAmigos,
  retirarAmigo,
};
