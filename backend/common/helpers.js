const bcrypt = require('bcryptjs');

// sync hasher
// export const passwordHasher = (password, tempUserData, //eslint-disable-line
//    insertTempUser, callback) => {
//   const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return insertTempUser(hash, tempUserData, callback);
// };

// async hasher
export const passwordHasher = (password, tempUserData, //eslint-disable-line
  insertTempUser, callback) => {
  bcrypt.genSalt(8, (err, salt) =>
    bcrypt.hash(password, salt, (err2, hash) =>
    insertTempUser(hash, tempUserData, callback)),
  );
};
