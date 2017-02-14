const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  temp: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', User);
