const router = require('express').Router();
const wrap = require('co-express');
const User = require('../models/user');

function dbQuery(options) {
  const query = {
    username: new RegExp(options.name, 'i'),
  };
  if (options.sameGender === 'true') {
    query.gender = 'M';
  }
  return query;
}

// using co-express wraper -> note how we can store async values
function* getUsers(req, res) {
  const users = yield User.find(dbQuery(req.query));
  res.json(users);
}

// standard api method, using callbakcs
function createUser(req, res) {
  const { username } = req.body;
  User.create({
    username,
  }, (err, doc) => {
    res.json(doc);
  });
}

router.get('/', wrap(getUsers));
router.put('/', createUser);

module.exports = router;
