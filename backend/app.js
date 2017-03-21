const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('../common/config.js');
const jwt = require('jsonwebtoken');

// const Language = require('./models/language');
// const Level = require('./models/level');
// const wrap = require('co-express');

const app = express();

mongoose.connect(config.db);
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// unprotected routes
app.use('/', require('./api/login'));
app.use('/', require('./api/register'));
app.use('/', require('./api/verify'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// auth middleware
//eslint-disable-next-line
app.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    //eslint-disable-next-line
    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Please register Log in using a valid email to submit posts',
        });
      }
      req.user = user; //eslint-disable-line
      return next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

// protected routes
app.use('/me', require('./api/me'));
app.use('/users/', require('./api/users'));
app.use('/levels', require('./api/levels'));
app.use('/languages', require('./api/languages'));

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});

// require('./helpers/usergenerator').populateDB(50);
// UNCOMMENT THIS TO GENERATE SOME LANGUAGES AND LEVELS
// function* createLanguages() {
//   const currentLanguages = yield Language.find({});
//   console.log(currentLanguages);
//   if (currentLanguages.length === 0) {
//     yield Language.create({
//       name: 'Spanish',
//       abbreviation: 'ES',
//     });
//     yield Language.create({
//       name: 'English',
//       abbreviation: 'EN',
//     });
//     yield Language.create({
//       name: 'Romanian',
//       abbreviation: 'RO',
//     });
//     console.log('done');
//   }
// }
//
// function* createLevels() {
//   const currentLevels = yield Level.find({});
//   if (currentLevels.length === 0) {
//     yield Level.create({
//       name: 'C2',
//       level: 5,
//     });
//     yield Level.create({
//       name: 'C1',
//       level: 4,
//     });
//     yield Level.create({
//       name: 'B2',
//       level: 3,
//     });
//     console.log('done');
//   }
// }
//
// wrap(createLanguages)();
// wrap(createLevels)();
