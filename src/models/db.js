// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import cors from 'cors';

mongoose.connect('mongodb://localhost/dbtp2');

//pour renovyer status
// res.status(400);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const LocationSchema = new Schema({
//   id: String,
//   nom: String,
//   prenom: String,
//   titre: String,
// });

// const Location = mongoose.model('Location', TodosSchema);
module.export = Schema;