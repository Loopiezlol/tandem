const router = require('express').Router();
const nev = require('../mailer/index');


function verifyUrl(req, res) {
  const url = req.params.URL;
  nev.confirmTempUser(url, (err, user) => {
    if (user) {
      return res.redirect('/'); // if all goes well, go to login page (TODO:Render login p)
    }
    return res.status(404).send('ERROR: confirming temp user FAILED');
  });
}


router.get('/email-verification/:URL', verifyUrl);

module.exports = router;
