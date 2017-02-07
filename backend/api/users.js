const router = require('express').Router();
const User = require('../models/user');

function getUsers(req, res) {
  User.find({}, (err, docs) => {
    res.json(docs);
  });
}

function createUser(req, res) {
  const { username } = req.body;
  User.create({
    username,
  }, (err, doc) => {
    res.json(doc);
  });
}

router.get('/', getUsers);
router.put('/', createUser);

module.exports = router;
