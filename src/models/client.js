const db = require("../models/db.js");

const ClientSchema = new db.Schema({
  id: String,
  nom: String,
  prenom: String,
});

const Client = db.mongoose.model('Client', ClientSchema);

Client.getNom = (id) => {
  return "Martin Roy";
}

module.exports = Client;