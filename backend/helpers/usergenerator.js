const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
  populateDB(n) {
    const ObjectId = mongoose.Types.ObjectId;
    const interests = [...Array(12).keys()].map(i => ({ name: `interest_${i}`, notes: 'BLAH!' }));
    const someLanguages = [new ObjectId('58c332f56e9f63495f858d7f'), new ObjectId('58c332f56e9f63495f858d80'), new ObjectId('58c332f56e9f63495f858d7e')];
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
