const User = require('../models/user');
const mongoose = require('mongoose');
const Language = require('../models/language');

module.exports = {
  populateDB(n) {
    const ObjectId = mongoose.Types.ObjectId;
    const interests = [...Array(12).keys()].map(i => ({ name: `interest_${i}`, notes: 'BLAH!' }));
    const someLanguages = [new ObjectId('58c332f56e9f63495f858d7f'),
      new ObjectId('58c332f56e9f63495f858d80'),
      new ObjectId('58c332f56e9f63495f858d7e'),
      new ObjectId('58c33391c04e654a01ed752b'),
      new ObjectId('58c33391c04e654a01ed752c'),
      new ObjectId('58c33391c04e654a01ed752d'),
      new ObjectId('58c33396ae17654a1e87b39f'),
      new ObjectId('58c33396ae17654a1e87b3a0'),
      new ObjectId('58c33396ae17654a1e87b3a1')];
    [...Array(n).keys()].forEach((i) => {
      User.create({
        username: `user${i}`,
        gender: ['M', 'F'][Math.floor(Math.random() * 2)],
        mainLanguage: someLanguages[Math.floor(Math.random() * 9)],
        wantsToLearn: [
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          // levelId:
          },
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          //
          },
          {
            languageId: someLanguages[Math.floor(Math.random() * 9)],
          //
          }],
        interests: [interests[Math.floor(Math.random() * 12)], interests[Math.floor(Math.random() * 12)]],
      });
    });
  },
};
