const mongoose = require('mongoose');

const Level = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number },
  // icon: {...}
});

module.exports = mongoose.model('Level', Level);
