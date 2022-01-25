let reservation = require("../models/reservation.js");

const prixJour = 25;
exports.faireReservation = async (req,res,next) => {
  let laDate = new Date(req.body.date);
  
  let uneReservation = new reservation({
    id: req.body.id,
    idFacture: req.body.id + laDate.toISOString().split('T')[0],
    idClient: req.body.idClient,
    idVehicule: req.body.idVehicule,
    montantLocation: req.body.duree * prixJour,
    statut: req.body.statut,
    date: laDate.toISOString().split('T')[0],
    duree: req.body.duree
  });
  const data = await reservation.reserver(uneReservation);
  
  return res.json({
    "fonction":"fairereservation",
    "montantLocation":data.montantLocation,
    "noFacture":data.idFacture
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

  exports.Annuler = async(req,res,next) => {
    const data = await reservation.annuler(req.params.idReservation);

    return res.json({
      "fonction":"Annuler",
      "data":data
    });
  }


  exports.AfficherFacture = async(req,res,next) => {
    const data = await reservation.getFacture(req.params.idFacture);

    return res.json({
      "fonction":"AfficherFacture",
      "data":data
    });
  }