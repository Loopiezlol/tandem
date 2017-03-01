const router = require('express').Router();
const wrap = require('co-express');
const User = require('../models/user');
const validator = require('validator');

// using co-express wraper -> note how we can store async values
function validateLoginForm(req,res) {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  let isFormValid = true;
  let message = '';

  if (!email || typeof email !== 'string' || !validator.isEmail(email)  || !email.endsWith("kcl.ac.uk")) {
    isFormValid = false;
    errors.email = 'Please provide a valid KCL e-mail.';
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return res.json ({
    success: isFormValid,
    message,
    errors
  });
}


router.put('/login', validateLoginForm);

module.exports = router;
