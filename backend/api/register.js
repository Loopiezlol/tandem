const validator = require('validator');
const router = require('express').Router();
const User = require('../models/user');
const nev = require('../mailer/index');

function registerUser(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const { email } = req.body;

  // SENDS EMAIL WHEN YOU REGISTER
  nev.createTempUser(user, (err, existingPersistentUser, newTempUser) => {
    const errors = {};
    if (err) {
      return res.status(404).json({
        message: 'ERROR: creating temp user FAILED',
        errors,
      });
    }

      // user already exists in persistent collection
    if (existingPersistentUser) {
      return res.json({
        success: true,
        message: 'You have already signed up and confirmed your account. Did you forget your password?',
      });
    }

      // new user created
    if (newTempUser) {
      const URL = newTempUser[nev.options.URLFieldName];

      return nev.sendVerificationEmail(email, URL, (err1) => {
        if (err1) {
          return res.status(404).json({
            message: 'ERROR: sending verification email FAILED',
            errors,
            err1,
          });
        }
        return res.json({
          success: true,
          message: 'An email has been sent to you. Please check it to verify your account.',
        });
      });
      // user already exists in temporary collection!
    }
    return res.json({
      success: true,
      message: 'You have already signed up. Please check your email to verify your account.',
    });
  });
}

function validateSignupForm(req) {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;
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

  if (!(password === repassword)) {
    isFormValid = false;
    errors.repassword = 'Password doesn\'t match.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.put('/register', (req, res) => {
  const validationResult = validateSignupForm(req);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  return registerUser(req, res);
});

module.exports = router;
