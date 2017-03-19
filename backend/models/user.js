const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('User', User);
