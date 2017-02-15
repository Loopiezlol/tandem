
const router = require('express').Router();
const wrap = require('co-express');

function getRegisterPage(req, res) {
  res.render('register.html');
}

function registerUser(req, res) {
}

router.get('/', getRegisterPage);
router.post('/', registerUser);

module.exports = router;
