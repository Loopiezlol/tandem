const validator = require('validator');
const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user');
const TempUser = require('../models/tempUser');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const bcrypt = require('bcryptjs');



myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

nev.configure({
  persistentUserModel: User,
  tempUserModel: TempUser,
  expirationTime: 600, // 10 minutes

  verificationURL: 'http://localhost:3000/email-verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'daybreak.vk@gmail.com',
      pass: 'daybreak1',                       //ADD E-MAIL USERNAMER HERE
    }
  },

  hashingFunction: myHasher,
  passwordFieldName: 'password',
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});



function registerUser (req, res) {
  const user = new User ({
  	email: req.body.email,
  	password: req.body.password
  });
  const password = req.body.password;

  // SENDS EMAIL WHEN YOU REGISTER
  nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
  const errors = {};
      if (err) {
        return res.status(404).json({
          message: 'ERROR: creating temp user FAILED',
          errors
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
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(req.body.email, URL, function(err, info) {
          if (err) {
            return res.status(404).json({
              message: 'ERROR: sending verification email FAILED',
              errors
            });
          }
          return res.json({
            success: true,
            message: 'An email has been sent to you. Please check it to verify your account.',
            info: info,
          });
        });
      // user already exists in temporary collection!
      } else {
        return res.json({
          success: true,
          message: 'You have already signed up. Please check your email to verify your account.',
        });
      }
});
}

function validateSignupForm(req) {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;
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
    errors
  };
}

 router.put('/register', (req, res) => {
   const validationResult = validateSignupForm(req);
   if (!validationResult.success) {
     return res.status(400).json({
       success: false,
       message: validationResult.message,
       errors: validationResult.errors
     });
   }

     return registerUser(req,res);
 });

module.exports = router;
