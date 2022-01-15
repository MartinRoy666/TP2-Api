let bagnole = require("../models/voiture.js");

exports.getVoitures = async ( req,res,next) => {};

exports.ajouterVoiture = async ( req,res,next) => {
  let voiture = new bagnole({
    id: req.params.id,
    type: req.params.type,
    nbPlace: req.params.nbPlace,
    couleur: req.params.couleur,
    puissance: req.params.puissance,
  });

  const data = await bagnole.prototype.ajouterVoiture(voiture);
  // res.render("commandesEnCours", {data: listevoiture, titre: "Ensemble des Commandes"});
}
// app.post("/todos/:nom/:prenom/:titre", async (req, res) => {
//   let maTodo = new Todos({
//     id:id,
//     nom: req.params.nom,
//     prenom: req.params.prenom,
//     titre: req.params.titre,
//   });

//   await maTodo.save();
//   id = parseInt(id + 1);
//   return res.json(maTodo);
  
// });