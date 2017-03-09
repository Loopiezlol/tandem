const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('../common/config.js');

const app = express();

mongoose.connect(config.db);
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/users/', require('./api/users'));
app.use('/', require('./api/login'));
app.use('/', require('./api/register'));
app.use('/', require('./api/verify'));

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
