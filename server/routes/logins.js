require('dotenv').config();
const router = require('express').Router();
const User = require('../../db/models/users.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const storeMysql = require('express-mysql-session')(session);
const initialize = require('../controllers/passport_config.js');
initialize(passport);

const option = {
  host: process.env.Host,
	port: 3306,
	user: process.env.User,
	password: process.env.DB_PASSWORD,
	database: process.env.Database
}

const store = new storeMysql(option);
router.use(session({
  secret: process.env.Secret,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))
router.use(passport.initialize());
router.use(passport.session());

router.post('/register', (req, res) => {
  console.log(req.user)
  const {firstName, lastName, email, phone, password} = req.body;
  const hashedPassword = Promise.resolve(bcrypt.hash(password, 10));

  hashedPassword.then((hashed) => {
   return User.create({first_name: firstName, last_name: lastName, email: email, phone_number: phone, password: hashed})
  }).then((results) => {
    // res.redirect('/login')
    passport.authenticate('local', (err, user, info) => {
      if(err) {
        console.log('11')
        return next(err)
      }
        console.log('33')
        const {first_name, last_name, email, id, balance} = user;
        const obj = {}
        obj.first_name = first_name;
        obj.last_name = last_name;
        obj.email = email;
        obj.id = id;
        obj.balance = balance
        console.log("🤲🏻", obj);
        req.logIn(user, (err) => {
          if(err) {
            return next(err)
          }
        })
        res.send(obj);
    })(req, res);
  }).catch((err) => {
    console.log("😵", err.errors[0].message);
    if(err.errors[0].message === 'users.email must be unique') {
      res.status(404).send('Email already exists');
    } else {
      res.status(400).send('Fail');
    }
  })
  // res.redirect('/login');
});

router.post('/login', (req, res, next) => {
  console.log("test11111🤒");
  console.log(req.user)
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return next(err)
    }
    if(!user) {
      res.status(401).send(info.message);
    }else {
      // const {first_name, last_name, email, id, balance} = user;
      //   const obj = {phone_number, first_name, last_name, email, id};const {first_name, last_name, email, id, balance} = user;
        const {first_name, last_name, email, id, balance} = user;
        const obj = {}
        obj.first_name = first_name;
        obj.last_name = last_name;
        obj.email = email;
        obj.id = id;
        obj.balance = balance
        console.log("🤲🏻", obj);
        req.logIn(user, (err) => {
          if(err) {
            return next(err)
          }
        })
      res.send(obj);
    }
  })(req, res);
})




router.get('/checkAuth', (req, res) => {
  if(req.isAuthenticated()) {

    const {first_name, last_name, email, id, balance} = req.user;
        const obj = {}
        obj.first_name = first_name;
        obj.last_name = last_name;
        obj.email = email;
        obj.id = id;
        obj.balance = balance
    res.send(obj)
  } else {
    console.log('heelloo')
    res.send(401)
  }
})

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.end();
})
// function checkAuth(req, res, next) {
//   console.log('we are called');
//   if(req.isAuthenticated()){
//     return next()
//   } else {
//     next()
//   }
// }
module.exports = router