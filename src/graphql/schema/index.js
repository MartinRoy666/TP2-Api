const { buildSchema } = require('graphql')
const voiture = require('../../models/voiture.js');

//1 ou plusieurs parametre non obligatoire
// redefinir le typ voiture dans le schema
let schema = buildSchema(`
type voiture {
  type: String
  nbPlace: String
  couleur: String
  puissance: String
}
  type Query {
    getVoitures(type: String, nbPlace: String, couleur: String, puissance: String): [voiture]
  }
`)
/*
let schema = buildSchema(`
  type Query {
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
    rollThreeDice: [Int]
  }
`) 
*/
// module.exports.rollThreeDice = () => {
//   return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
// }

// module.exports.rollDice = ({ numDice, numSides }) => {
//   let output = []
//   for (let i = 0; i < numDice; i++) {
//     output.push(1 + Math.floor(Math.random() * (numSides || 6)))
//   }
//   return output
// }

// const RandomDie = require("../models/RandomDie")

// module.exports.getDie = ({ numSides }) => {
//   return new RandomDie(numSides || 6)
// }



/* let schema = buildSchema(`
  type Query {
    hello: String
  }
`) */

/* let schema = buildSchema(`
  type Query {
    random: Float!
    rollThreeDice: [Int]
  }
`) */

/* let schema = buildSchema(`
  type Query {
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`) */

// let schema = buildSchema(`
//   type RandomDie {
//     numSides: Int!
//     rollOnce: Int!
//     roll(numRolls: Int!): [Int]
//   }

//   type Query {
//     random: Float!
//     getDie(numSides: Int): RandomDie
//   }
// `)
module.exports = schema
