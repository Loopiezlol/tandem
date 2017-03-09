const mongoose = require('mongoose');

const Language = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  name: { type: String, required: true },
  // icon: {...}
});

module.exports = mongoose.model('Language', Language);
