const mongoose = require('mongoose');

const TempUser = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  GENERATED_VERIFYING_URL: String,
});

module.exports = mongoose.model('TempUser', TempUser);
