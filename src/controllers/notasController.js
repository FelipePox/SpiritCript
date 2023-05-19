const { Nota } = require("../models/Nota");

const getAllNotas = async (req, res) => {
  const notes = await Nota.find();
  if (!notes) return res.status(204).json({ message: "No note found" });
  return res.json({ notas: notes });
};

const getAllNotasByUserId = async (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(400).json({ message: "UserId parameter is required" });

  const notes = await Nota.find({ userId: userId });

  res.json({ notas: notes });
};

const createNewNota = async (req, res) => {
  const { title, userId, text, verse, book, grupoId } = req.body;

  if (!title || !userId || !text || !verse || !book)
    return res
      .status(400)
      .json({ message: "Title, userId, test, verse and book are required" });

  try {
    const result = await Nota.create({
      title: title,
      text: text,
      verse: verse,
      book: book,
      userId: userId,
      grupoId: grupoId,
    });

    res.status(200).json(result);
  } catch {
    console.log(err);
  }
};

const updateNota = async (req, res) => {
  const { id, title, text, book, verse, userId, grupoId } = req.body;

  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const note = await Nota.findOne({ _id: req.body.id }).exec();

  if (!note) {
    return res
      .status(204)
      .json({ message: "No note matches ID" + req.body.id });
  }

  if (title) note.title = title;
  if (text) note.text = text;
  if (verse) note.verse = verse;
  if (book) note.book = book;
  if (userId) note.userId = userId;
  if (grupoId) note.grupoId = grupoId;

  const result = await note.save();
  res.status(200).json(result);
};

const deleteNota = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const foundNota = await Nota.findOne({ _id: id });
  if (!foundNota)
    return res
      .status(204)
      .json({ message: "No note matches ID" + req.body.id });

  const result = await Nota.deleteOne({ _id: id });

  res.status(200).json(result);
};

module.exports = {
  updateNota,
  createNewNota,
  getAllNotas,
  getAllNotasByUserId,
  deleteNota,
};
