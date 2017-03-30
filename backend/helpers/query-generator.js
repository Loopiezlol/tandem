const Language = require('../models/language'); // this has to be initialized before populating the users
const User = require('../models/user');
const wrap = require('co-express');
// helper method

function* _dbQuery(options, id) {
  const user = yield User.findOne({ _id: id });
  const query = {
    _id: { $ne: id },
  };
  if (options.name) {
    const toMatch = new RegExp(options.name, 'i');
    query.$or = [
      { username: toMatch },
      { firstName: toMatch },
      { lastName: toMatch },
      { email: toMatch },
    ];
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

  return query;
}

module.exports = {
  dbQuery: wrap(_dbQuery),
};
