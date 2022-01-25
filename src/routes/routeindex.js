let express = require('express');
let router = express.Router();

const voitureController = require('../controllers/voiture_controller.js');
const reservationController = require('../controllers/reservation_controller.js');

router.get('/afficherfacture/:idFacture', reservationController.AfficherFacture);
router.post('/ajoutvoiture/:id/:type/:nbPlace/:couleur/:puissance', voitureController.ajouterVoiture);

router.post('/reservation', reservationController.faireReservation);
router.post('/annulation/:idReservation', reservationController.Annuler);

router.get('/getParcVoitures', voitureController.getParcVoitures);
router.get('/afficherreservationclient/:idClient', reservationController.afficherReservationClient);
router.get('/afficherreservationselondate/:dateRecherche', reservationController.afficherReservationSelonDate);

router.get('/getventetotalmois', reservationController.VenteTotalMois);

module.exports = router;