
const router = require('express').Router();
const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');

function logIn(req, res) {
  const errors = {};

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      errors.email = 'No user registered with this e-mail.';
      return res.json({
        message: 'Invalid email or password',
        errors,
      });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(user, config.secret, {
        expiresIn: '1440m', // expires in 24 hours
      });
      return res.json({
        message: 'Success!',
        errors,
        // user,
        token,
      });
    }
    errors.password = 'Incorrect password.';
    return res.json({
      message: 'Invalid email or password',
      errors,
    });
  });
}

function validateLoginForm(req, res) {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  let isFormValid = true;
  let message = '';

  if (!email || typeof email !== 'string' || !validator.isEmail(email)
   || !email.endsWith('kcl.ac.uk')) {
    isFormValid = false;
    errors.email = 'Please provide a valid KCL e-mail.';
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
    return res.status(400).json({
      success: isFormValid,
      message,
      errors,
    });
  }
  return logIn(req, res);
}


router.put('/login', validateLoginForm);

module.exports = router;
