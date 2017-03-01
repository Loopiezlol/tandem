const router = require('express').Router();
const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');

function logIn(req,res){
  const errors = {};
  const email = req.body.email;
  User.findOne({email: req.body.email}, function(err,user){
     if(!user){
       errors.email = 'No user registered with this e-mail.'
        res.json({
        message:'Invalid email or password',
        errors
    });
    }
    else{
      if(bcrypt.compareSync(req.body.password, user.password)){
        res.json({
        message:'This should get you to the dashboard now',
        errors
      });
      }else{
        errors.password = 'Incorrect password.'
          res.json({
          message:'Invalid email or password',
          errors
        });
      }
    }
  })
};

// using co-express wraper -> note how we can store async values
function validateLoginForm(req,res) {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  let isFormValid = true;
  let message = '';

  if (!email || typeof email !== 'string' || !validator.isEmail(email)  || !email.endsWith("kcl.ac.uk")) {
    isFormValid = false;
    errors.email = 'Please provide a valid KCL e-mail.';
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  return res.status(400).json ({
    success: isFormValid,
    message,
    errors
  });
  }
  return logIn(req,res);
}


router.put('/login', validateLoginForm);

module.exports = router;
