const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  gender: { type: String },
  profilePicutre: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  mainLanguage: { type: mongoose.Schema.ObjectId, ref: 'Language' },
  wantsToLearn: [
    {
      _id: false,
      languageId: { type: mongoose.Schema.ObjectId, ref: 'Language' },
      levelId: { type: mongoose.Schema.ObjectId, ref: 'Level' },
    },
  ],
  interests: [
    {
      _id: false,
      name: { type: String },
      notes: { type: String },
    },
  ],
  onboardingDone: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', User);
