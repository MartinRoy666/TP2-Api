let express = require('express');
let router = express.Router();
const clientsController = require('../controllers/clients_controller.js');


// router.get('/menuclient', menuController.getMenu);


// app.get('/todos/:id', async (req, res) => {
//   // console.log(req.params.id);
//   let mesTodo =  await Todos.find({id:req.params.id});
//   return   res.json(mesTodo);
// });

// app.get("/test", async (req, res) => {
//   let maTodo = new Todos({
//     id:id,
//     nom: "Bob",
//     prenom: "Bricoleur",
//     titre: "autre",
//   });
//   await maTodo.save();
//   id = parseInt(id + 1);
//   return res.json(maTodo);
// });

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

module.exports = router;