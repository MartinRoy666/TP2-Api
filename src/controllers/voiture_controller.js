let bagnole = require("../models/voiture.js");

exports.getVoitures = async ({type, nbPlace, couleur, puissance}) => { 
  const data = await bagnole.prototype.afficherVoiture(type, nbPlace, couleur, puissance);
  let liste= [];
  
  console.log("dans getVoitures controller");

  data.forEach(element => {
    // console.log(element);
    liste.push(element);
    
  });
  // return res.json({
  //   "data":data
  // });
  // console.log("la liste" + liste);
  // return JSON.stringify(data);
  return liste;
};

exports.ajouterVoiture = async ( req,res,next) => {
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