const router = require('express').Router();
const wrap = require('co-express');
const User = require('../models/user');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const bcrypt = require('bcryptjs');

// using co-express wraper -> note how we can store async values

myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

nev.configure({
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes

  verificationURL: 'http://localhost:3000/email-verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'daybreak.vk@gmail.com',                                     //ADD E-MAIL USERNAMER HERE
      pass: 'daybreak1'                                      //ADD PASSWORD HERE
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

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

function registerUser (req, res) {
  console.log(req.body);
  const user = new User ({
  	email: req.body.email,
  	password: req.body.password
  });
  const password = req.body.password;

  // SENDS EMAIL WHEN YOU REGISTER
  nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED');
      }

      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.json({
          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
        });
      }

      // new user created
     if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(req.body.email, URL, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending verification email FAILED');
          }
          res.json({
            msg: 'An email has been sent to you. Please check it to verify your account.',
            info: info
          });
        });
      // user already exists in temporary collection!
      } else {
        res.json({
          msg: 'You have already signed up. Please check your email to verify your account.'
        });
      }
});
}
router.put('/', registerUser);

module.exports = router;
