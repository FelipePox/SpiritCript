const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grupoSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  color: { trype: String, required: true },
});

const Grupo = mongoose.model("Grupo", grupoSchema);

module.exports = { Grupo };
