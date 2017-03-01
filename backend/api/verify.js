const router = require('express').Router();
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const User = require('../models/user');
const TempUser = require('../models/tempUser');

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
      res.redirect('/'); //if all goes well, go to login page (TODO:Render login p)
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
  };


router.get('/email-verification/:URL', verifyUrl);

module.exports = router;
