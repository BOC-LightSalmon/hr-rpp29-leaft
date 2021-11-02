const router = require('express').Router();
const User = require('../../db/models/users.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const initialize = require('../controllers/passport_config.js');
initialize(passport);
router.use(passport.initialize());

router.post('/register', (req, res) => {
  const {firstName, lastName, email, phone, password} = req.body;
  const hashedPassword = Promise.resolve(bcrypt.hash(password, 10));

  hashedPassword.then((hashed) => {
   return User.create({first_name: firstName, last_name: lastName, email: email, phone_number: phone, password: hashed})
  }).then((results) => {
    res.send('success');
  }).catch((err) => {
    console.log("😵", err.errors[0].message);
    if(err.errors[0].message === 'users.email must be unique') {
      res.status(404).send('Email already exists');
    } else {
      res.status(400).send('Fail');
    }
  })
  // res.send('test');
});

router.post('/login', (req, res, next) => {
  console.log("test")
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.log('1')
      return next(err)
    }
    if(!user) {
      console.log('2')
      res.status(401).send('Incorrect Password');
    }else {
      console.log('3')
      res.send(user.email);
    }
  })(req, res);
})

module.exports = router