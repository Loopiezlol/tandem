const Language = require('../models/language'); // this has to be initialized before populating the users
const User = require('../models/user');
const wrap = require('co-express');
// helper method

function* _dbQuery(options, id) {
  const user = yield User.findOne({ _id: id });
  const query = {};
  if (options.name) {
    query.username = new RegExp(options.name, 'i');
  }

  if (options.languagesToMatch) {
    query.mainLanguage = options.languagesToMatch;
  }

  if (options.interests) {
    query['interests.name'] = { $in: options.interests };
  }

  if (options.sameGender === 'true') {
    query.gender = user.gender;
  }

  if (options.matchLanguages === 'true') {
    query['wantsToLearn.languageId'] = user.mainLanguage;
  }

  console.log('query: ', query);
  [...Array(99999).keys()].forEach(x => console.log(x));
  return query;
}

module.exports = {
  dbQuery: wrap(_dbQuery),
};
