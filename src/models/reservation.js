const db = require("../models/db.js");

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