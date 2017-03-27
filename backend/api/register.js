const validator = require('validator');
const router = require('express').Router();
const User = require('../models/user');
const nev = require('../mailer/index');
const fconfig = require('../../common/formsconfig');

function registerUser(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
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
        message: fconfig.accountConfirmed,
      });
    }

      // new user created
    if (newTempUser) {
      const URL = newTempUser[nev.options.URLFieldName];

      return nev.sendVerificationEmail(email, URL, (err1) => {
        if (err1) {
          return res.status(404).json({
            message: fconfig.verificationEmailError,
            errors,
            err1,
          });
        }
        return res.json({
          success: true,
          message: fconfig.verificationEmailSent,
        });
      });
      // user already exists in temporary collection!
    }
    return res.json({
      success: true,
      message: fconfig.pleaseVerify,
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
    errors.email = fconfig.emailError;
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    isFormValid = false;
    errors.password = fconfig.passwordError;
  }

  if (!(password === repassword)) {
    isFormValid = false;
    errors.repassword = fconfig.repasswordError;
  }

  if (!isFormValid) {
    message = fconfig.formError;
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
