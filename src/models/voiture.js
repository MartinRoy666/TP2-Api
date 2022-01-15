const db = require("../models/db.js");

// localhost:3010/ajoutvoiture/2/Bmw/4/LemansBlue/414/

const VoitureSchema = new db.Schema({
  id: String,
  type: String,
  nbPlace: String,
  couleur: String,
  puissance: String,
});

const Voiture = db.mongoose.model('Voiture', VoitureSchema);

Voiture.prototype.ajouterVoiture= (async (detailVoiture, req, res, next) => {
  
  await detailVoiture.save();
  
  return detailVoiture;
 
});

Voiture.prototype.afficherVoiture= (async (req, res) => {
  let lesVoitures = await Voiture.find();
  return lesVoitures;

});

module.exports = Voiture;