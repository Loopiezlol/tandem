const User = require('../models/user');
// const mongoose = require('mongoose');
const Language = require('../models/language');
const wrap = require('co-express');
// const Language = require('../models/language');
const Level = require('../models/level');

function* _populateDB(n) {
  // const interests = [...Array(12).keys()].map(i => ({ name: `interest_${i}`, notes: 'BLAH!' }));
  const interests = require('../../client-web-app/app/interests.js').map(x => x.name);
  const languages = yield Language.find({});
  const levels = yield Level.find({});
  [...Array(n).keys()].forEach((i) => {
    User.create({
      username: `user${i}`,
      email: `user_${i}@kcl.ac.uk`,
      gender: ['M', 'F'][Math.floor(Math.random() * 2)],
      mainLanguage: languages[Math.floor(Math.random() * languages.length)]._id,
      wantsToLearn: [{
        languageId: languages[Math.floor(Math.random() * languages.length)]._id,
        levelId: levels[Math.floor(Math.random() * levels.length)]._id,
        // levelId:
      }],
      interests: [interests[Math.floor(Math.random() * 12)],
        interests[Math.floor(Math.random() * 12)]],
    }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
    });
  });
}

module.exports = {
  populateDB: wrap(_populateDB),
};
