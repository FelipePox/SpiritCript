const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amigosSchema = new Schema({
  userId: { type: String, required: true },
  amigos: { type: [Object], required: false },
});

const Amigos = mongoose.model("Amigos", amigosSchema);

module.exports = { Amigos };
