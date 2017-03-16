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


// testing purposes only, should remove afterwards
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

app.use('/me', require('./api/me'));
app.use('/users/', require('./api/users'));

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  const host = server.address().address;
  console.log('App listening at http://%s:%s', host, port);
});
