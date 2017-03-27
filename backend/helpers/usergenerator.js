const User = require('../models/user');
const Language = require('../models/language');
const wrap = require('co-express');
const Level = require('../models/level');

function* _populateDB(n) {
  const interests = require('./interests.js').map(x => ({ name: x.label }));
  const languages = yield Language.find({});
  const levels = yield Level.find({});
  const docs = [...Array(n)].map((x, i) => ({
    firstName: `First${i}`,
    lastName: `Last${i}`,
    username: `username_${i}`,
    age: '21',
    email: `user_${i}@kcl.ac.uk`,
    gender: ['M', 'F'][Math.floor(Math.random() * 2)],
    mainLanguage: languages[Math.floor(Math.random() * languages.length)]._id,
    wantsToLearn: [{
      languageId: languages[Math.floor(Math.random() * languages.length)]._id,
      levelId: levels[Math.floor(Math.random() * levels.length)]._id,
    },
    {
      languageId: languages[Math.floor(Math.random() * languages.length)]._id,
      levelId: levels[Math.floor(Math.random() * levels.length)]._id,
    }],
    interests: [interests[Math.floor(Math.random() * 12)],
      interests[Math.floor(Math.random() * 12)]],
    onboardingDone: true,
  }));

  User.insertMany(docs, (err, doc) => {
    if (err) {
      console.log('err:::', err);
    }
    console.log('doc:::::::::::', doc);
  });
}

module.exports = {
  populateDB: wrap(_populateDB),
};
