const { now } = require("mongoose");
const db = require("../models/db.js");
const client = require("../models/client.js");
const facture = require("../models/facture.js");
const Facture = require("../models/facture.js");
const Voiture = require("../models/voiture.js");
// {
//   "id": "1",
//    "idClient": "1",
//    "idVehicule": "1",
//     "montantLocation": "30",
//     "statut": "1",
//     "date": "2022-01-20",
//     "duree": "5"
//   }

const ReservationSchema = new db.Schema({
  id: String,
  idFacture: String,
  idClient: String,
  idVehicule: String,
  montantLocation: String,
  statut: String,
  date: Date,
  duree: String,
});

const Reservation = db.mongoose.model('Reservation', ReservationSchema);

Reservation.reserver = ( async (reservation, req,res,next) => {
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

// consulter facture precise - afficher facture precise
Reservation.getFacture = async(idFacture, req,res) => {
  let reservationClient = await Reservation.find(
    { idFacture: idFacture}
  ).exec();

  let laVoiture = await Voiture.recupererParId(reservationClient[0].idVehicule);

  if (reservationClient == null) {
    return "Aucune facture trouvé pour ce numéro: " + idFacture;
  } else {
  let laFacture = new Facture();
  laFacture.nomClient = await client.getNom(reservationClient[0].idClient);
  laFacture.montant = reservationClient[0].montantLocation;
  laFacture.dateDebut = reservationClient[0].date.toISOString().split('T')[0];
  laFacture.duree = reservationClient[0].duree;
  laFacture.nomvoiture = laVoiture[0].type;

  console.log(laFacture);
  return laFacture;
  }
};

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

  let venteTotal=[{"Mois":"Janvier","Montant":0},
    {"Mois":"Fevrier","Montant":0},
    {"Mois":"Mars","Montant":0},
    {"Mois":"Avril","Montant":0},
    {"Mois":"Mai","Montant":0},
    {"Mois":"Juin","Montant":0},
    {"Mois":"Juillet","Montant":0},
    {"Mois":"Aout","Montant":0},
    {"Mois":"Septembre","Montant":0},
    {"Mois":"Octobre","Montant":0},
    {"Mois":"Novembre","Montant":0},
    {"Mois":"Decembre","Montant":0}];

  let lesReservations = await Reservation.find();
  
  lesReservations.forEach(element => {
    let moisBoucle = parseInt(element.date.toISOString().substring(5,7))-1;
    venteTotal[moisBoucle].Montant = venteTotal[moisBoucle].Montant + parseInt(element.montantLocation);
  });

  console.log(venteTotal);
  return venteTotal;
});


//En tant que gestionnaire je veux connaitre mon % de réservation

//En tant que gestionnaire je veux connaitre les disponibilités d’un véhicule précis


module.exports = Reservation;