const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('../common/config.js');
const jwt = require('jsonwebtoken');

const app = express();

mongoose.connect(config.db);
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/', require('./api/login'));
app.use('/', require('./api/register'));
app.use('/', require('./api/verify'));
app.use('/', require('./api/levels'));
app.use('/', require('./api/languages'));

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

app.use('/me', require('./api/me'));
app.use('/users/', require('./api/users'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
