let reservation = require("../models/reservation.js");

exports.fairereservation = async (req,res,next) => {
  // let reservation = new reservation();
  // reservation = req.params;

  console.log(req.body);
  console.log(req.body.date);

  let uneReservation = new reservation({
    id: req.body.id,
    idClient: req.body.idClient,
    idVehicule: req.body.idVehicule,
    montantLocation: req.body.montantLocation,
    statut: req.body.statut,
    date: req.body.date,
    duree: req.body.duree
  });
  // reservation = req.body;
  // let voiture = new bagnole({
  //   id: req.params.id,
  //   type: req.params.type,
  //   nbPlace: req.params.nbPlace,
  //   couleur: req.params.couleur,
  //   puissance: req.params.puissance,
  // });

  const data = await reservation.prototype.reserver(uneReservation);
  // res.render("commandesEnCours", {data: listevoiture, titre: "Ensemble des Commandes"});

  
  }