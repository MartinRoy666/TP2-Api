let express = require('express');
let router = express.Router();

const clientsController = require('../controllers/clients_controller.js');
const voitureController = require('../controllers/voiture_controller.js');
const reservationController = require('../controllers/reservation_controller.js');

router.post('/ajoutvoiture/:id/:type/:nbPlace/:couleur/:puissance', voitureController.ajouterVoiture);

router.post('/reservation', reservationController.fairereservation);
router.post('/annulation/:idReservation', reservationController.Annuler);

router.get('/getParcVoitures', voitureController.getParcVoitures);
router.get('/afficherreservationclient/:idClient', reservationController.afficherReservationClient);
router.get('/afficherreservationselondate/:dateRecherche', reservationController.afficherReservationSelonDate);

router.get('/getventetotalmois', reservationController.VenteTotalMois);

module.exports = router;