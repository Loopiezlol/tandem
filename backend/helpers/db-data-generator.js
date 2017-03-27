const Language = require('../models/language');
const Level = require('../models/level');
const wrap = require('co-express');


function* _generateLanguages() {
  yield console.log(4);
}

module.exports = {
  generateLanguages: wrap(_generateLanguages),
};
