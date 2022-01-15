const db = require("../models/db.js");

const FactureSchema = new db.Schema({
  id: String,
  idClient: String,
  tempsLocation: String,
  idVehicule: String,
  montantLocation: String,
});

const Facture = db.mongoose.model('Facture', FactureSchema);