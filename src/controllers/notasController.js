const { Amigos } = require("../models/Amigos");
const { Nota } = require("../models/Nota");
const { User } = require("../models/User");
const { SendEmail } = require("../utils/emailSend");

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
  const { title, userId, text, verse, book, grupoId, public } = req.body;

  if (!title || !userId || !text || !verse || !book)
    return res
      .status(400)
      .json({ message: "Title, userId, test, verse and book are required" });

  try {
    if (public) {
      const USER = await User.findOne({ _id: userId });
      const USERNAME = USER.username;

      const foundAmigos = await Amigos.findOne({ userId: userId });

      const allowedEmails = foundAmigos.amigos.map((amigo) => amigo.amigoEmail);
      console.log(allowedEmails);

      const result = await Nota.create({
        title: title,
        text: text,
        verse: verse,
        book: book,
        userId: userId,
        grupoId: grupoId,
        public: true,
        allowed: allowedEmails,
      });

      SendEmail(
        "SpiritScript - Um amigo seu acabou de postar uma nota!",
        `<h1>Nova nota!</h1><p>Seu amigo ${USERNAME} acabou de postar uma nota! Clique <a href="https://www.youtube.com/watch?v=pfU0QORkRpY">aqui</a> para entrar na plataforma e vê-la!</p>`,
        allowedEmails
      );

      res.status(200).json(result);
    } else {
      const result = await Nota.create({
        title: title,
        text: text,
        verse: verse,
        book: book,
        userId: userId,
        grupoId: grupoId,
      });

      res.status(200).json(result);
    }
  } catch {
    console.log(err);
    res.sendStatus(500);
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
