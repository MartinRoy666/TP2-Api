// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import cors from 'cors';
let db= {};
mongoose.connect('mongodb://localhost/louevite');

//pour renovyer status
// res.status(400);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

db.Schema = Schema;
db.ObjectId = ObjectId;
db.mongoose = mongoose;
// const LocationSchema = new Schema({
//   id: String,
//   nom: String,
//   prenom: String,
//   titre: String,
// });

// const Location = mongoose.model('Location', TodosSchema);
module.exports = db;