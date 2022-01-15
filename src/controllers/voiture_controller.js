let bagnole = require("../models/voiture.js");

exports.getVoitures = async ( req,res,next) => { 
  const data = await bagnole.prototype.afficherVoiture();

  return res.json({
    "fonction":"getVoitures",
    "data":data
  });
};

exports.ajouterVoiture = async ( req,res,next) => {
  let voiture = new bagnole({
    id: req.params.id,
    type: req.params.type,
    nbPlace: req.params.nbPlace,
    couleur: req.params.couleur,
    puissance: req.params.puissance,
  });

  const data = await bagnole.prototype.ajouterVoiture(voiture);

  return res.json({
    "fonction":"ajouterVoiture",
    "data":data
  });
  
}
