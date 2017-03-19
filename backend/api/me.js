const router = require('express').Router();
const config = require('../../common/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const helpers = require('../common/helpers');

// eslint-disable-next-line
function getUserFromToken(req, res) {
  const token = req.body.token || req.query.token;
  if (token) {
    // eslint-disable-next-line
    jwt.verify(token, config.secret, (err, user) => {
      if (!err) {
        //eslint-disable-next-line
        User.findOne({ _id: user._doc._id }, (err1, found) => {
          if (err) {
            return res.json({
              success: false,
              message: 'failed to find user',
            });
          }
          // can refresh token here with
          // const token = helpers.signJWTToken(found)
          return res.json({
            token,
            user: helpers.getCleanUser(found),
          });
        });
      } else {
        return res.json({
          success: false,
          message: 'failed to authentificate token',
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'must provide token',
    });
  }
}

router.put('/', getUserFromToken);

module.exports = router;
