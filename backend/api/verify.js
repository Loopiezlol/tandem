const router = require('express').Router();
const nev = require('../mailer/index');
const fconfig = require('../../common/formsconfig');

/* Vertification mail
to send in user inbox
*/
function verifyUrl(req, res) {
  const url = req.params.URL;
  nev.confirmTempUser(url, (err, user) => {
    if (user) {
      return res.redirect('/'); // if all goes well, go to login page (TODO:Render login p)
    }
    return res.status(404).json(fconfig.confirmUserError);
  });
}


router.get('/email-verification/:URL', verifyUrl);

module.exports = router;
