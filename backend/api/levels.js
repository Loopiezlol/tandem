const router = require('express').Router();
const wrap = require('co-express');
const Level = require('../models/level');

// using co-express wraper -> note how we can store async values
function* getLevels(req, res) {
  const users = yield Level.find({});
  res.json(users);
}

router.get('/', wrap(getLevels));

module.exports = router;
