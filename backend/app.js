const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('../common/config.js');
const jwt = require('jsonwebtoken');
const generators = require('./helpers/db-data-generator');

const app = express();
app.use(cors());
app.options('*', cors());
// app.use((req, res, next) => {
//   const origin = req.get('origin');
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // intercept OPTIONS method
//   if (req.method === 'OPTIONS') {
//     res.send(200);
//   } else {
//     next();
//   }
// });

/* Another port to run
the app on 3000 localhost
*/
if (require.main === module) {
  mongoose.connect(config.db);

  generators.generateLanguages();
  generators.generateLevels();
} else {
  mongoose.connect('mongodb://localhost/test');
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// unprotected routes
app.use('/', require('./api/login'));
app.use('/', require('./api/register'));
app.use('/', require('./api/verify'));

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.redirect(`${config.client}/#/login`);
});


// auth middleware

app.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
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

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000!');
  });
} else {
  module.exports = app;
}
