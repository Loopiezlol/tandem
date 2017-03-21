const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const User = require('../models/user');
const TempUser = require('../models/tempUser');
const bcrypt = require('bcryptjs');

const myHasher = (password, tempUserData, insertTempUser, callback) => {
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(password, salt, (err1, hash) =>
      insertTempUser(hash, tempUserData, callback));
  });
};

nev.configure({
  persistentUserModel: User,
  tempUserModel: TempUser,
  // eslint-disable-next-line
  verificationURL: 'http://localhost:3000/email-verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'daybreak.vk@gmail.com',
      pass: 'theyfoundmypassword',                       //ADD E-MAIL USERNAMER HERE
    },
  },

  hashingFunction: myHasher,
  passwordFieldName: 'password',
}, (err, options) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ', (typeof options === 'object'));
});

module.exports = nev;
