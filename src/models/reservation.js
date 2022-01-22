const { now } = require("mongoose");
const db = require("../models/db.js");

// {
//   "id": "1",
//    "idClient": "1",
//    "idVehicule": "1",
//     "montantLocation": "30",
//     "statut": "1",
//     "date": "today",
//     "duree": "5"
//   }

const ReservationSchema = new db.Schema({
  id: String,
  idClient: String,
  idVehicule: String,
  montantLocation: String,
  statut: String,
  date: Date,
  duree: String,
});

const Reservation = db.mongoose.model('Reservation', ReservationSchema);

Reservation.prototype.reserver = ( async (reservation, req,res,next) => {
  await reservation.save();
  return reservation;
});

Reservation.annuler = ( async (idReservation, req, res, next) => {
  const filter = {id : idReservation,
  date : {$gte: now()}};

  const update = {statut : 0};

  let siExiste = await Reservation.findOneAndUpdate(filter, update, {new: true});

  if (siExiste == null) {
    return "La réservation ne peut être annulé (vérifier le numéro ainsi que la date de réservation)"
  } else {
    return "La réservation a été annulé."
    }
});

Reservation.afficherReservationClient = (async (idClient, req, res, next) => {

  let reservationClient = await Reservation.find(
    { idClient: idClient}
  ).exec();


  if (reservationClient == 0) {

    return { "Message" : "Aucune reservation de fait."}
  } else {
    return reservationClient;
  }

});


// connaitre prix reservation
// consulter facture precise - afficher facture precise


// Section Gestionnaire ****************

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

Reservation.afficherReservationSelonDate = (async (dateRecherche, req, res, next) => {
  
  let dateDebut = new Date(dateRecherche);
  let dateFin = new Date(dateRecherche);

  let reservationDate = await Reservation.find(
    { date: {
      $gte: dateDebut.toISOString().split('T')[0],
      $lt: addDays(dateFin,1).toISOString().split('T')[0]
  }}
  ).exec();

  if (reservationDate == 0) {
    return { "Message" : "Aucune reservation de fait pour cette date."}
  } else {  
    return reservationDate;
  }
});

//En tant que gestionnaire je veux sortir la somme totale de mes ventes 
//par mois
Reservation.VenteTotalMois = ( async (req, res) => {
  let total=0;
  let reservationDate = await Reservation.find();

  reservationDate.forEach(element => {
    total = parseInt(total) + parseInt(element.montantLocation);
    
  });

  return total
});

//Reservation.afficherReservationClient

//En tant que gestionnaire je veux connaitre mon % de réservation

//En tant que gestionnaire je veux connaitre les disponibilités d’un véhicule précis


module.exports = Reservation;