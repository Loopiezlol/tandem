const router = require('express').Router();
// const mongoose = require('mongoose');
const config = require('../../common/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Level = require('../models/level');
const Language = require('../models/language');
const wrap = require('co-express');
const helpers = require('../common/helpers');

/* user Token callers
class
*/
//eslint-disable-next-line
function getUserFromToken(req, res) {
  const token = req.body.token || req.query.token;
  if (token) {
    //eslint-disable-next-line
    jwt.verify(token, config.secret, (err, user) => {
      if (!err) {
        if (User.findOne({ _id: user._doc._id }) === null) {
          return res.status(404).json({
            success: false,
            message: 'non-existent-user',
          });
        }
        User.findOne({ _id: user._doc._id }).populate('wantsToLearn.languageId mainLanguage wantsToLearn.levelId')
        .exec((err1, found) => {
          if (err) {
            return res.status(404).json({
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
        return res.status(400).json({
          success: false,
          message: 'failed to authentificate token',
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'must provide token',
    });
  }
}

function* finishOnboarding(req, res) {
  const { info: userInfo, id: userId } = req.body;
  const me = yield User.findOne({ _id: userId });
  if (me) {
    const mainLanguageId = yield Language.findOne({ name: userInfo.mainLanguage });
    const wantsToLearn = [];
    for (const item of userInfo.wantsToLearn) {
      const languageId = yield Language.findOne({ name: item.name });
      const levelId = yield Level.findOne({ name: item.level });
      wantsToLearn.push({
        languageId,
        levelId,
      });
    }
    const update = Object.assign({}, userInfo, {
      onboardingDone: true,
      mainLanguage: mainLanguageId._id,
      wantsToLearn,
    });
    yield User.update({ _id: userId }, update);
    return res.json({
      success: true,
    });
  }
  return res.status(404).json({
    message: 'No user found',
    success: false,
  });
}

function* updateUser(req, res) {
  // TODO: test this
  const { tempUser } = req.body;

  const found = User.findOne({ _id: tempUser._id }).lean();
  // return res.json({
  //   user: helpers.getCleanUser(found.populate('wantsToLearn.languageId mainLanguage')),
  // });
  if (found) {
    const wantsToLearn = [];
    for (const item of tempUser.wantsToLearn) {
      const languageId = yield Language.findOne({ name: item.name });
      const levelId = yield Level.findOne({ name: item.level });
      wantsToLearn.push({
        languageId,
        levelId,
      });
    }
    const update = Object.assign({}, tempUser, {
      mainLanguage: tempUser.mainLanguage._id,
      wantsToLearn,
    });
    // delete update._id;
    yield User.update({ _id: found._id }, update);
    return res.json({
      success: true,
    });
  }
  return res.status(404).json({
    message: 'No user found',
    success: false,
  });
}

router.put('/', getUserFromToken);
router.put('/finish-onboarding', wrap(finishOnboarding));
router.put('/update', wrap(updateUser));

module.exports = router;
