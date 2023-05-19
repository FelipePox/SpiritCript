const { Grupo } = require("../models/Grupo");

const getAllGrupos = async (req, res) => {
  const groups = await Grupo.find();
  if (!groups) return res.status(204).json({ message: "No group found" });
  res.json({ grupos: groups });
};

const getAllGruposByUserId = async (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "UserId parameter is required" });

  const groups = await Grupo.find({ userId: userId }).exec();

  res.json({ grupos: groups });
};

const createNewGrupo = async (req, res) => {
  const { name, userId, color } = req.body;

  if (!name || !userId || !color) {
    return res.status(400).json({ message: "Name and color are required" });
  }

  try {
    const result = await Grupo.create({
      name: name,
      color: color,
      userId: userId,
    });

    res.status(200).json(result);
  } catch {
    console.log(err);
  }
};

const updateGrupo = async (req, res) => {
  const { id, name, color, userId } = req.body;

  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const group = await Grupo.findOne({ _id: id }).exec();

  if (!group) {
    return res.status(204).json({ message: "No group matches ID" + id });
  }

  if (req.body?.name) group.name = name;
  if (req.body?.color) group.color = color;
  if (req.body?.userId) group.userId = userId;

  const result = await group.save();
  res.json(result);
};

const deleteGrupo = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const foundGrupo = await Grupo.findOne({ _id: id });
  if (!foundGrupo)
    return res.status(204).json({ message: "No group matches ID" + id });

  const result = await Grupo.deleteOne({ _id: id });

  res.status(200).json(result);
};

module.exports = {
  getAllGrupos,
  createNewGrupo,
  updateGrupo,
  getAllGruposByUserId,
  deleteGrupo,
};
