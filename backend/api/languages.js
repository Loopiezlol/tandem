const router = require('express').Router();
const wrap = require('co-express');
const Language = require('../models/language');

// using co-express wraper -> note how we can store async values
function* getLanguages(req, res) {
  const users = yield Language.find({});
  res.json(users);
}

router.get('/', wrap(getLanguages));

module.exports = router;
