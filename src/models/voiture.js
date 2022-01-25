const db = require("../models/db.js");

const VoitureSchema = new db.Schema({
  id: String,
  type: String,
  nbPlace: String,
  couleur: String,
  puissance: String,
});

const Voiture = db.mongoose.model('Voiture', VoitureSchema);

Voiture.ajouterVoiture = (async (detailVoiture, req, res, next) => {
  await detailVoiture.save();
  return detailVoiture;
});

Voiture.prototype.afficherVoiture= (async (type, nbPlace, couleur, puissance , req, res) => {
  
  let lesVoitures = await Voiture.find(
    { $or: [
       {type : type},
       {nbPlace : nbPlace},
       {couleur: couleur},
       {puissance: puissance}
    ]
    }
  ).exec();

  return lesVoitures;

});

Voiture.recupererParcVoiture= (async (req, res) => {
  
  let lesVoitures = await Voiture.find().exec();
  return lesVoitures;

});

Voiture.recupererParId = async(idVoiture, req,res) => {
  let laVoiture = await Voiture.find({
    id: idVoiture
  }).exec();

  return laVoiture;
}
module.exports = Voiture;