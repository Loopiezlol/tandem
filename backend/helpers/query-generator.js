const Language = require('../models/language'); // this has to be initialized before populating the users
const mongoose = require('mongoose');

// helper method
module.exports = {
  dbQuery(options) {
    // console.log(options.languagesToMatch);
    const query = {};

    if (options.name) {
      query.username = new RegExp(options.name, 'i');
    }

    if (options.sameGender === 'true') {
      const MALE = 'M'; // hard coded for now
      query.gender = MALE;
    }

    if (options.languagesToMatch) {
      query.mainLanguage = options.languagesToMatch;
    }

    // if (options.intesets) {
    //   query.interests = options.interests;
    // }
    // hard coded the current user's mainLanguage for now
    const ENGLISH = '58b9ccf16a4efb4d7b96d5ba';
    query['wantsToLearn.languageId'] = ENGLISH;
    console.log('query: ', query);
    return query;
  },
};
