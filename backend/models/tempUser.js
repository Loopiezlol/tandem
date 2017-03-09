const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId;

const TempUser = new mongoose.Schema({
  email : {type: String, unique: true },
  password: String,
  GENERATED_VERIFYING_URL: String
});

module.exports = mongoose.model('TempUser', TempUser);
