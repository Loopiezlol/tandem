const express = require('express');
const cors = require('cors');
const router = require('express').Router();
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const bodyParser = require('body-parser');
const User = require('../models/user');
const TempUser = require('../models/tempUser');

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

function verifyUrl (req, res) {
  var url = req.params.URL;
  const user =  TempUser.findOne({GENERATED_VERIFYING_URL: url}, function(err, document) {
     const user = document;
  });

  nev.confirmTempUser(url,function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
      res.redirect('/'); //if all goes well, go to login page (TODO: display message on top "Successfully verified!")
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
  };


router.get('/email-verification/:URL', verifyUrl);

module.exports = router;
