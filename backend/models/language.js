const mongoose = require('mongoose');

const Language = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  name: { type: String, required: true },
  abbreviation: { type: String, required: true, unique: true },
  // icon: {...}
});

module.exports = mongoose.model('Language', Language);
