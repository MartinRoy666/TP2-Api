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

module.exports = schema
