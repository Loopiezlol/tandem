module.exports = {
  secret: 'toblazeornottoblazethatisthequestion',
  db: process.env.NODE_ENV === 'production' ? 'mongodb://heroku_rpncztz0:k9iiuej7kikgaobmqld0g2faf9@ds133290.mlab.com:33290/heroku_rpncztz0' : 'mongodb://localhost/tandem',
  mailerLogin: 'daybreak.vk@gmail.com',
  mailerPassword: 'daybreak1',
  server: process.env.NODE_ENV === 'production' ? 'https://tandem-kcl.herokuapp.com' : 'http://localhost:3000',
};
