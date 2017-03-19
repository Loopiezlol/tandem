const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/my_database');
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users/', require('./api/users'));

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});

// const Language = require('./models/language');
//
// const someLanguages = ['English', 'Spanish', 'French'];
//
// someLanguages.forEach((l) => {
//   Language.create({
//     name: l,
//   });
// });

require('./helpers/usergenerator').populateDB(50);
require('./helpers/usergenerator').populateDBwithLanguages();
