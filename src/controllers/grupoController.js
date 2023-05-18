const { Grupo } = require("../models/Grupo");

const getAllGroups = async (req, res) => {
  const groups = await Grupo.find();
  if (!groups) return res.status(204).json({ message: "No Group found" });
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

module.exports = {
  getAllGroups,
  createNewGroup,
};
