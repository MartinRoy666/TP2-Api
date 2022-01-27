const { now } = require("mongoose");
const db = require("../models/db.js");
const client = require("../models/client.js");
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
  dateDebut: Date,
  duree: String,
});

const Reservation = db.mongoose.model('Reservation', ReservationSchema);

Reservation.reserver = ( async (reservation, req,res,next) => {
  await reservation.save();
  return reservation;
});

Reservation.annuler = ( async (idReservation, req, res, next) => {
  const filter = {id : idReservation,
    dateDebut : {$gte: now()}};

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
  laFacture.dateDebut = reservationClient[0].dateDebut.toISOString().split('T')[0];
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
    { dateDebut: {
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
    let moisBoucle = parseInt(element.dateDebut.toISOString().substring(5,7))-1;
       
    venteTotal[moisBoucle].Montant = venteTotal[moisBoucle].Montant + parseInt(element.montantLocation);
  });

  console.log(venteTotal);
  return venteTotal;
});


//En tant que gestionnaire je veux connaitre mon % de réservation
Reservation.pourcentageReservation = async(datePrecise, req,res) => {
  
  let nbVoiture = await Voiture.getCount();

  let listeReservation = await Reservation.aggregate([
  { 
     $match : { "dateDebut": {  $gte: new Date(datePrecise), $lt: addDays(new Date(datePrecise),1) }}
  },
  {
    $group:
    {
        _id: { idVehicule: "$idVehicule" },
    }
  }
]);

  let pourcent = (listeReservation.length * 100) / nbVoiture;
  return pourcent;
}


function ajoutReservation(dateDebut, duree) {
  //
  let calend= [];
  return calend;
}

//En tant que gestionnaire je veux connaitre les disponibilités d’un véhicule précis

Reservation.disponibiliteCar = async(idVehicule, req,res) => {

  let disponibiliteAutosMois=[{"Mois":"Janvier","Jours":Array(31).fill("D")},
  {"Mois":"Fevrier","Jours":Array(28).fill("D")},
  {"Mois":"Mars","Jours":Array(31).fill("D")},
  {"Mois":"Avril","Jours":Array(30).fill("D")},
  {"Mois":"Mai","Jours":Array(31).fill("D")},
  {"Mois":"Juin","Jours":Array(30).fill("D")},
  {"Mois":"Juillet","Jours":Array(31).fill("D")},
  {"Mois":"Aout","Jours":Array(31).fill("D")},
  {"Mois":"Septembre","Jours":Array(30).fill("D")},
  {"Mois":"Octobre","Jours":Array(31).fill("D")},
  {"Mois":"Novembre","Jours":Array(30).fill("D")},
  {"Mois":"Decembre","Jours":Array(31).fill("D")}];

  let listeReservation = await Reservation.find(
    { idVehicule: idVehicule }
  ).sort({dateDebut: 'asc'});

  if (listeReservation !== null) {
      listeReservation.forEach(element => {
        let jourDebut = parseInt(element.dateDebut.toISOString().substring(8,10));

        // console.log(element.dateDebut + " -- " + element.duree);
        // console.log(jourDebut);
        // console.log(disponibiliteAutosMois[element.dateDebut.getMonth()].Jours);

        for (let index = parseInt(jourDebut)-1; index < (jourDebut + parseInt(element.duree))-1; index++) {
          // console.log(index);
          try {
            disponibiliteAutosMois[element.dateDebut.getMonth()].Jours.splice(index, 1, "X");
          }
          catch(err) {
            console.log(err);
          }
        }
        // console.log(disponibiliteAutosMois[element.dateDebut.getMonth()].Jours);
      });
  }

  // console.log(disponibiliteAutosMois[0]);
  return disponibiliteAutosMois;
}



module.exports = Reservation;