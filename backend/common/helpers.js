const jwt = require('jsonwebtoken');
const config = require('../../common/config');

module.exports = {
  generateJWTToken(user) {
    return jwt.sign(user, config.secret, {
      expiresIn: '1440m', // expires in 24 hours
    });
  },

  getCleanUser(user) {
    if (!user) return {};
    const u = user.toJSON();
    // ADD FIELDS HERE
    // FOR EXAMPLE I'VE REMOVED PASSWORD FIELD WHEN RETURNING THE USER;
    return {
      //eslint-disable-next-line
      _id: u._id,
      username: u.username,
      email: u.email,
      gender: u.gender,
      firstName: u.firstName,
      lastName: u.lastName,
      interests: u.interests.map(interest => ({ name: interest.name,
        notes: interest.notes })),
      onboardingDone: u.onboardingDone,
    };
  },
};
