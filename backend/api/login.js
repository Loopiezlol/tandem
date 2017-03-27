
const router = require('express').Router();
const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');
const fconfig = require('../../common/formsconfig');

function logIn(req, res) {
  const errors = {};

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      errors.email = fconfig.invalidEmail;
      return res.json({
        message: fconfig.badCredentials,
        errors,
      });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(user, config.secret, {
        expiresIn: '1440m', // expires in 24 hours
      });
      return res.json({
        message: fconfig.success,
        errors,
        // user,
        token,
      });
    }
    errors.password = fconfig.incorrectPassword;
    return res.json({
      message: fconfig.badCredentials,
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
    errors.email = fconfig.emailError;
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    isFormValid = false;
    errors.password = fconfig.passwordError;
  }

  if (!isFormValid) {
    message = fconfig.formError;
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
