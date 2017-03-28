const Language = require('../models/language');
const Level = require('../models/level');
const wrap = require('co-express');
const languages = require('./languages');
const levels = require('./levels');

function* _generateLanguages() {
  const currentLanguages = yield Language.find({});
  if (!currentLanguages.length) {
    yield Language.insertMany(languages);
  }
}

function* _generateLevels() {
  const currentLevels = yield Level.find({});
  if (!currentLevels.length) {
    yield Level.insertMany(levels);
  }
}

module.exports = {
  generateLanguages: wrap(_generateLanguages),
  generateLevels: wrap(_generateLevels),
};
