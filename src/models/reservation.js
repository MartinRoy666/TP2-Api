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
  date: String,
  duree: String,
});

const Reservation = db.mongoose.model('Reservation', ReservationSchema);

Reservation.prototype.reserver = ( async (reservation, req,res,next) => {

  await reservation.save();
  return reservation;
  // return reservation;
});

module.exports = Reservation;