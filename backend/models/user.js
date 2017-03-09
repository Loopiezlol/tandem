const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  mainLanguage: { type: mongoose.Schema.ObjectId, ref: 'Language' },
  wantsToLearn: [
    {
      languageId: { type: mongoose.Schema.ObjectId, ref: 'Language' },
      levelId: { type: mongoose.Schema.ObjectId, ref: 'Level' },
    },
  ],
  interests: [
    {
      name: { type: String },
      notes: { type: String },
    },
  ],
});

module.exports = mongoose.model('User', User);
