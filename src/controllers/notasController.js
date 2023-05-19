const { Notas } = require("../Models/Notas");

const getAllNotas = async (req, res) => {
  const notes = await Notas.find();
  if (!notes) return res.status(204).json({ message: "No Notes found" });
  return res.json({ notas: notes });
};

const getAllNotasByUserId = async (req, res) => {
  if (!req?.body?.userId)
    return res.status(400).json({ message: "UserId parameter is required" });

  const notes = await Notas.find({ userId: req.body.userId });

  res.json({ notas: notes });
};

const createNewNote = async (req, res) => {
  if (
    !req?.body?.title ||
    !req?.body?.userId ||
    !req?.body?.text ||
    !req?.body?.verse ||
    !req?.body?.book
  )
    return res
      .status(400)
      .json({ message: "Title, userId, test, verse and book are required" });

  try {
    const result = await Notas.create({
      title: req.body.title,
      text: req.body.text,
      verse: req.body.verse,
      book: req.body.book,
      userId: req.body.userId,
      grupoId: req.body.grupoId
    });

    res.status(200).json(result);
  } catch {
    console.log(err);
  }
};

const updateNote = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required" });

  const note = await Notas.findOne({ _id: req.body.id }).exec();

  if (!note) {
    return res
      .status(204)
      .json({ message: "No note matches ID" + req.body.id });
  }

  if (req.body?.title) note.title = req.body.title;
  if (req.body?.text) note.text = req.body.text;
  if (req.body?.verse) note.verse = req.body.verse;
  if (req.body?.book) note.book = req.body.book;
  if (req.body?.userId) note.userId = req.body.userId;
  if(req.body?.grupoId) note.grupoId = req.body.grupoId;

  const result = await note.save();
  res.status(200).json(result);
};

module.exports = {
  updateNote,
  createNewNote,
  getAllNotas,
  getAllNotasByUserId,
};
