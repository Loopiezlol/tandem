const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const bodyParser = require('body-parser');
const User = require('./models/user');
const TempUser = require('./models/tempUser');


const app = express();
mongoose.connect('mongodb://localhost/my_database');
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

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
