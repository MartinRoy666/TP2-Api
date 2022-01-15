const db = require("../models/db.js");
import bodyParser from 'body-parser';
import cors from 'cors';

const VoitureSchema = new db.Schema({
  id: String,
  type: String,
  nbPlace: String,
  couleur: String,
  puissance: String,
});

const Voiture = db.mongoose.model('Voiture', VoitureSchema);

Voiture.prototype.ajouterVoiture= (async (detailVoiture, req, res) => {
  await detailVoiture.save();
  return res.json(detailVoiture);
  // app.post("/todos/:nom/:prenom/:titre", async (req, res) => {
  //   let maTodo = new Todos({
  //     id:id,
  //     nom: req.params.nom,
  //     prenom: req.params.prenom,
  //     titre: req.params.titre,
  //   });
  
  //   await maTodo.save();
  //   id = parseInt(id + 1);
  //   return res.json(maTodo);
    
  // });
});

Voiture.prototype.afficherVoiture= (async (req, res) => {
  let lesVoitures = await Voiture.find();
  return res.json(lesVoitures);
//   app.get('/todos', async (req, res) => {
//     let mesTodo =  await Todos.find();
//     let mesTodo =  await Todos.find({id:req.params.id});
//     return   res.json(mesTodo);
// });
});

module.exports = Voiture;