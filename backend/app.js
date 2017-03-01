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

app.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

//Const user = find the user with this token in database!
  TempUser.findOne({GENERATED_VERIFYING_URL: url}, function(err, document) {
  const user = document;
});

// MAKE _ WAIT FOR ^ TO FINISH!!!

  nev.confirmTempUser(url, function(err, user) {
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
});



app.use('/users/', require('./api/users'));
app.use('/', require('./api/login'));
app.use('/', require('./api/register'));

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
