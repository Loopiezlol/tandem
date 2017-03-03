const mongoose = require('mongoose');

const User = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('User', User);
