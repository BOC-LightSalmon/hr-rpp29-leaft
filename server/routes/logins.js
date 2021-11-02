const router = require('express').Router();
const User = require('../../db/models/users.js');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
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

module.exports = router