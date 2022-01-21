let reservation = require("../models/reservation.js");

exports.fairereservation = async (req,res,next) => {
  let laDate = new Date(req.body.date);
  
  let uneReservation = new reservation({
    id: req.body.id,
    idClient: req.body.idClient,
    idVehicule: req.body.idVehicule,
    montantLocation: req.body.montantLocation,
    statut: req.body.statut,
    date: laDate.toISOString().split('T')[0],
    duree: req.body.duree
  });
  const data = await reservation.prototype.reserver(uneReservation);
  
  return res.json({
    "fonction":"fairereservation",
    "data":req.body.montantLocation
  }); 
  }

  exports.afficherReservationClient = async(req,res,next) => {

    const data= await reservation.afficherReservationClient(req.params.idClient);

    return res.json({
      "fonction":"afficherReservationClient",
      "data":data
    }); 
  }

  exports.afficherReservationSelonDate = async(req,res,next) => {

    const data= await reservation.afficherReservationSelonDate(req.params.dateRecherche);

    return res.json({
      "fonction":"afficherReservationSelonDate",
      "data":data
    }); 
  }
  
  exports.VenteTotalMois = async(req, res, next) => {

    const data= await reservation.VenteTotalMois();

    return res.json({
      "fonction":"VenteTotalMois",
      "data":data
    });
  }
