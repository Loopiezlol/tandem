const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nev = require('email-verification')(mongoose);
const session = require('client-sessions');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost/auth');

// routers
app.use('/users/', require('./api/users'));

// needed to allow communication between different devices
app.use(cors());

// needed to get data from the body of requests
app.use(bodyParser.json({ limit: '50mb' }));

// COOOOOOKIES
app.use(session({
  cookieName: 'session',
  secret: 'sjdnkjfndkjfnjdf143ujn48',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true, //protects from bad stuff
  //secure: true //only uses cookies over https!
}));


//AUTH MIDDLEWARE
app.use(function(req,res,next){
if(req.session && req.session.user) {
  User.findOne({email: req.body.email}, function(err,user){
    if(user){
      req.user=user;
      delete req.user.password;
      req.session.user=req.user;
      res.locals.user=req.user; //now can access from page
}
next();
});
} else{
  next();
}
});

function requireLogin(req,res,next){
  if(!req.session.user){
    res.redirect('/login');
  } else {
    next();
  }
}


// NEV configuration =====================
nev.configure({
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes

  verificationURL: 'http://localhost:3000/email-verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: '',                                     //ADD E-MAIL USERNAMER HERE
      pass: ''                                      //ADD PASSWORD HERE
    }
  },

  hashingFunction: myHasher,
  passwordFieldName: 'password',
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

app.get('/', function (req, res) {
  res.render('index.html')
});

//REGISTER PAGE STARTS HERE
app.get('/register', function (req, res) {
  res.render('register.html')
});


app.post('/register', function (req, res) {
  var user = new User ({
  	firstName: req.body.firstName,
  	lastName: req.body.lastName,
  	email: req.body.email,
  	password: req.body.password
  });
  var password = req.body.password;

  // SENDS EMAIL WHEN YOU REGISTER
  nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED');
      }

      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.json({
          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
        });
      }

      // new user created
     if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(req.body.email, URL, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending verification email FAILED');
          }
          res.json({
            msg: 'An email has been sent to you. Please check it to verify your account.',
            info: info
          });
        });
      // user already exists in temporary collection!
      } else {
        res.json({
          msg: 'You have already signed up. Please check your email to verify your account.'
        });
      }
});


// user accesses the link that is sent
app.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
      res.redirect('/login'); //if all goes well, go to login page (TODO: display message on top "Successfully verified!")
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
});
});


//LOGIN PAGE STARTS HERE

app.get('/login', function (req, res) {
  res.render('login.html')
});


app.post('/login', function(req,res){
  User.findOne({email: req.body.email}, function(err,user){
    if(!user){
      res.render('login.html' , {error:'Invalid email or password'});
    }
    else{
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user;
        res.redirect('/dashboard');
      }else{
        res.render('login.html' , {
          error:'Invalid email or password'
        });
      }
    }
  })
});



//DASHBOARD STARTS HERE


app.get('/dashboard',requireLogin, function (req, res) {
      res.render('dashboard.html');
});


app.get('/logout', function (req, res) {
  req.session.reset();
  res.redirect('/login')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
