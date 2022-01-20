const mongoose = require('mongoose');

let db= {};
mongoose.connect('mongodb://localhost/louevite');

//pour renovyer status
// res.status(400);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

db.Schema = Schema;
db.ObjectId = ObjectId;
db.mongoose = mongoose;

module.exports = db;