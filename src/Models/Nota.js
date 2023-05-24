const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notasSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  verse: { type: [String], required: true },
  book: { type: String, required: true },
  userId: { type: String, required: true },
  grupoId: { type: String, required: false },
  public: { type: Boolean, default: false },
  allowed: { type: [String], required: false },
});

const Nota = mongoose.model("Notas", notasSchema);

module.exports = { Nota };
