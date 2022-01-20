/* module.exports = {
  hello: () => {
    return 'Hello world!'
  },
} */

// const randomController = require('../../controllers/RandomController')
// const diceController = require('../../controllers/DiceController')

const voitureController = require('../../controllers/voiture_controller.js');

module.exports = {
  // random: randomController.randomNumber,
  // rollThreeDice: diceController.rollThreeDice
  // rollDice: diceController.rollDice
  // getDie: diceController.getDie
  getVoitures: voitureController.getVoitures
}
