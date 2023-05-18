const { Grupo } = require("../models/Grupo");

const getAllGroups = async (req, res) => {
  const groups = await Grupo.find();
  if (!groups) return res.status(204).json({ message: "No Group found" });
  res.json({ grupos: groups });
};

const getAllGroupsByUserId = async (req, res) => {
  if (!req?.body?.userId)
    return res.status(400).json({ message: "UserId parameter is required" });

  const groups = await Grupo.find({ userId: req.body.userId }).exec();

  res.json({ grupos: groups });
};

const createNewGroup = async (req, res) => {
  if (!req?.body?.name || !req?.body?.userId || !req?.body?.color) {
    return res.status(400).json({ message: "Name and color are required" });
  }

  try {
    const result = await Grupo.create({
      name: req.body.name,
      color: req.body.color,
      userId: req.body.userId,
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateGroup = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required" });

  const group = await Grupo.findOne({ _id: req.body.id }).exec();

  if (!group) {
    return res
      .status(204)
      .json({ message: "No group matches ID" + req.body.id });
  }

  if (req.body?.name) group.name = req.body.name;
  if (req.body?.color) group.color = req.body.color;
  if (req.body?.userId) group.userId = req.body.userId;

  const result = await group.save();
  res.json(result);
};

module.exports = {
  getAllGroups,
  createNewGroup,
  updateGroup,
  getAllGroupsByUserId,
};
