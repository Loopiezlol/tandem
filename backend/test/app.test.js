let server = require('../app.js');
const superagent = require('superagent');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const TempUser = require('../models/tempUser');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const fconfig = require('../../common/formsconfig');
const config = require('../../common/config');
const jwt = require('jsonwebtoken');
const Language = require('../models/language');

describe('Server + Forms', () => {
    beforeEach((done) => {
      server = server.listen(3000, (err) => {
        done(err);
      });
  });

  afterEach((done) => {
    server.close((err) => {
      done(err);
    });
  });

//MAIN PAGE TEST
it('should return Hello World at /', (done) => {
  superagent.get('http://localhost:3000/').end((err,res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.text, 'Hello World!');
done();
});
});

//INCORRECT FORMS TESTS
it('Should display incorrect email error at /register', (done) => {
  superagent.put('http://localhost:3000/register').send({ email: 'test@wrong.ac.uk', password: 'somepassword', repassword: 'testpassword' }).end((err, res) => {
   assert.equal(res.body.errors.email, fconfig.emailError);
   assert.equal(res.status, 400);
   return done()
});
});

it('Should display short password error  at /register', (done) => {
superagent.put('http://localhost:3000/register').send({ email: 'test@kcl.ac.uk', password: 'wrong', repassword: 'testpassword' }).end((err, res) => {
assert.equal(res.body.errors.password, fconfig.passwordError);
assert.equal(res.status, 400);
return done()
});
});

it('Should display passwords don\'t match error at /register', (done) => {
superagent.put('http://localhost:3000/register').send({ email: 'test@kcl.ac.uk', password: 'somepassword', repassword: 'wrongpassword' }).end((err, res) => {
assert.equal(res.body.errors.repassword, fconfig.repasswordError);
assert.equal(res.status, 400);
return done();
});
});


it('Should display incorrect email error at /login', (done) => {
  superagent.put('http://localhost:3000/login').send({ email: 'test@wrong.ac.uk', password: 'somepasswod'}).end((err,res) => {
assert.equal(res.status, 400);
assert.equal(res.body.errors.email, fconfig.emailError);
done();
});
});

it('Should display short password error  at /login', (done) => {
  superagent.put('http://localhost:3000/login').send({ email: 'test@kcl.ac.uk', password: 'wrong'}).end((err,res) => {
assert.equal(res.status, 400);
assert.equal(res.body.errors.password, fconfig.passwordError);
done();
});
});
});


describe('Database operations', function() {
  this.timeout(15000);
    beforeEach((done) => {
      server = server.listen(3000);
      TempUser.create({
          email: 'registeredtemp@kcl.ac.uk',
          password: 'somepassword',
          GENERATED_VERIFYING_URL: 'someURL',
        });

        bcrypt.hash("somepassword", 8, (err, hash) => {
        const password = hash;

        User.create({
          email: 'registeredverified@kcl.ac.uk',
          password: password,
     }, (err) => {
      done(err);
    });
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase();
    server.close((err) => {
      done(err);
    });
  });

//DATABASE CHECK TESTS
it('Should add new user to temporary collection and send a verficiation e-mail', (done) => {
superagent.put('http://localhost:3000/register').send({ email: 'test@kcl.ac.uk', password: 'somepassword', repassword: 'somepassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.message, fconfig.verificationEmailSent)
TempUser.findOne({ email: 'test@kcl.ac.uk' }, (err, user) => {
assert.isOk(user);
done();
});
});
});

it('Should say user is already registered, but account isn\'t activated', (done) => {
superagent.put('http://localhost:3000/register').send({ email: 'registeredtemp@kcl.ac.uk', password: 'somepassword', repassword: 'somepassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.message, fconfig.pleaseVerify)
TempUser.findOne({ email: 'registeredtemp@kcl.ac.uk' }, (err, user) => {
assert.isOk(user);
done();
});
});
});

it('Should say user is already registered and account is activated', (done) => {
superagent.put('http://localhost:3000/register').send({ email: 'registeredverified@kcl.ac.uk', password: 'somepassword', repassword: 'somepassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.message, fconfig.accountConfirmed)
User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
assert.isOk(user);
done();
});
});
});

it('Should say there is no user with this e-mail', (done) => {
superagent.put('http://localhost:3000/login').send({ email: 'registeredtemp@kcl.ac.uk', password: 'somepassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.errors.email, fconfig.invalidEmail);
assert.equal(res.body.message, fconfig.badCredentials);
done();
});
});

it('Should say there is no user with this password', (done) => {
superagent.put('http://localhost:3000/login').send({ email: 'registeredverified@kcl.ac.uk', password: 'wrongpassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.errors.password, fconfig.incorrectPassword);
assert.equal(res.body.message, fconfig.badCredentials);
done();
});
});

it('Should log in', (done) => {
superagent.put('http://localhost:3000/login').send({ email: 'registeredverified@kcl.ac.uk', password: 'somepassword' }).end((err, res) => {
if (err) { return done(err); }
assert.equal(res.status, 200);
assert.equal(res.body.message, fconfig.success);
done();
});
});

it('Should move user from temporary to permament collection', (done) => {
superagent.get('http://localhost:3000/email-verification/someURL').end((err, res) => {
if (err) { return done(err); }
User.findOne({ email: 'registeredtemp@kcl.ac.uk' }, (err, user) => {
assert.isOk(user);
});
TempUser.findOne({ email: 'registeredtemp@kcl.ac.uk' }, (err, user) => {
assert.isNotOk(user);
done();
});
});
});

it('Should say it couldn\' verify user', (done) => {
superagent.get('http://localhost:3000/email-verification/wrongURL').end((err, res) => {
assert.equal(res.status, 404);
assert.equal(res.body, fconfig.confirmUserError)
done();
});
});
});



describe('Logged in operations', function() {
  this.timeout(15000);
    beforeEach((done) => {
      server = server.listen(3000);
        bcrypt.hash("somepassword", 8, (err, hash) => {
        const password = hash;
        User.create({
          email: 'registeredverified@kcl.ac.uk',
          password: password,
     }, (err) => {
      done(err);
    });
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase();
    server.close((err) => {
      done(err);
    });
  });


  it('Should return ??? languages', (done) => {
    User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
      const token = jwt.sign(user, config.secret, {
        expiresIn: '1440m', // expires in 24 hours
      });
      superagent.get('http://localhost:3000/languages').send({ token: token }).end((err, res) => {
      assert.equal(res.status,200);
      assert.equal(res.body.length, 3);
      done();
      });
    });
  });

  it('Should return 1 user', (done) => {
    User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
      const token = jwt.sign(user, config.secret);
      superagent.get('http://localhost:3000/users').send({ token: token }).end((err, res) => {
      assert.equal(res.status,200);
      assert.equal(res.body.length, 1);
      done();
      });
    });
  });

  it('Should return 6 language levels', (done) => {
    User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
      const token = jwt.sign(user, config.secret);
      superagent.get('http://localhost:3000/levels').send({ token: token }).end((err, res) => {
      assert.equal(res.status,200);
      assert.equal(res.body.length, 6);
      done();
      });
    });
  });

  it('Should return same user', (done) => {
    User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
      const token = jwt.sign(user, config.secret);
      superagent.put('http://localhost:3000/me').send({token: token}).end((err, res) => {
      assert.equal(res.body.user.email, 'registeredverified@kcl.ac.uk');
      assert.equal(res.body.token, token);
      done();
      });
    });
  });

  it('Should finish user onboarding', (done) => {
    Language.create({
      name: 'Spanish',
      abbreviation: 'ES',
    });
    Language.create({
      name: 'Enlgish',
      abbreviation: 'EN',
    });
    Language.create({
      name: 'Spanish',
      abbreviation: 'RO',
    });
    const interests = [{ name: 'Music', notes: '' }, { name: 'Cooking', notes: '' }, { name: 'Reading', notes: '' }];
    const info = {
      gender: 'male',
      firstName: 'Test',
      lastName: 'Test',
      age: '17',
      interests,
      mainLanguage: 'Spanish',
      wantsToLearn: 'English',
    };

    User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
      const token = jwt.sign(user, config.secret);
      superagent.put('http://localhost:3000/me/finish-onboarding').send({token: token, id: user._id, info: info }).end((err, res) => {
      assert.equal(res.body.success, true);
      User.findOne({ email: 'registeredverified@kcl.ac.uk' }, (err, user) => {
        assert.equal(user.onboardingDone, true);
      });
      done();
      });
    });
  });
});

describe('Security checks', function() {
  this.timeout(15000);
    beforeEach((done) => {
      server = server.listen(3000, (err) => {
      done(err);
    });
  });

  afterEach((done) => {
    server.close((err) => {
      done(err);
    });
  });

  it('Should not allow access', (done) => {
      superagent.put('http://localhost:3000/me').send({token: 'wrongtoken'}).end((err, res) => {
      assert.equal(res.status, 401);
      done();
      });
  });
  it('Should not allow access', (done) => {
      superagent.put('http://localhost:3000/users').send({token: 'wrongtoken'}).end((err, res) => {
    assert.equal(res.status, 401);
      done();
      });
  });

  it('Should not allow access', (done) => {
      superagent.put('http://localhost:3000/levels').send({token: 'wrongtoken'}).end((err, res) => {
      assert.equal(res.status, 401);
      done();
      });
  });

  it('Should not allow access', (done) => {
      superagent.put('http://localhost:3000/languages').send({token: 'wrongtoken'}).end((err, res) => {
    assert.equal(res.status, 401);
      done();
      });
  });
});
