let bagnole = require("../models/voiture.js");

exports.getVoitures = async ({type, nbPlace, couleur, puissance}) => { 
  const data = await bagnole.prototype.afficherVoiture(type, nbPlace, couleur, puissance);
  let liste= [];
  
    data.forEach(element => {
      liste.push(element);  
  });
  return liste;
};

exports.getParcVoitures = async (req, res,next) => { 
  const data = await bagnole.recupererParcVoiture();
  return res.json({
    "fonction":"getParcVoitures",
    "data":data
  });
};

exports.ajouterVoiture = async (req,res,next) => {
  let voiture = new bagnole({
    id: req.params.id,
    type: req.params.type,
    nbPlace: req.params.nbPlace,
    couleur: req.params.couleur,
    puissance: req.params.puissance,
  });

  const data = await bagnole.ajouterVoiture(voiture);

  return res.json({
    "fonction":"ajouterVoiture",
    "data":data
  }); 
}