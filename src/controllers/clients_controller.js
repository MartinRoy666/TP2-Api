const db = require("../models/db.js") ;


// const schema = db.Schema;
const TodosSchema = new db({
  id: String,
  nom: String,
  prenom: String,
  titre: String,
});

// const Todos = mongoose.model('Todos', TodosSchema);