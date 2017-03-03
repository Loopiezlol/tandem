const router = require('express').Router();
const nev = require('../mailer/index');
// const TempUser = require('../models/tempUser');

function verifyUrl(req, res) {
  const url = req.params.URL;
  // const user =  TempUser.findOne({GENERATED_VERIFYING_URL: url}, function(err, document) {
  //    const user = document;
  // });

  nev.confirmTempUser(url, (err, user) => {
    if (user) {
      res.redirect('/');
      // if all goes well, go to login page (TODO:Render login p)
      // or show 'congrats message -> please go to link'
    }
    return res.status(404).send('ERROR: confirming temp user FAILED');
  });
}


router.get('/email-verification/:URL', verifyUrl);

module.exports = router;
