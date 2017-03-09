const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
  populateDB(n) {
    const ObjectId = mongoose.Types.ObjectId;
    const interests = [...Array(12).keys()].map(i => ({ name: `interest_${i}`, notes: 'BLAH!' }));
    const someLanguages = [new ObjectId('58b9ccf16a4efb4d7b96d5ba'), new ObjectId('58b9cda0bb447f4e95953092'), new ObjectId('58b9cdafe80f944ec8f14716')];
    [...Array(n).keys()].forEach((i) => {
      User.create({
        username: `user${i}`,
        gender: ['M', 'F'][Math.floor(Math.random() * 2)],
        mainLanguage: someLanguages[Math.floor(Math.random() * 3)],
        wantsToLearn: [{
          languageId: someLanguages[Math.floor(Math.random() * 3)],
          // levelId:
        }],
        interests: [interests[Math.floor(Math.random() * 12)], interests[Math.floor(Math.random() * 12)]],
      });
    });
  },
};
