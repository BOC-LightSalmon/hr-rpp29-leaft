const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../../db/models/users');


const initialize = (passport) => {
  const authenticate = (email, password, done) => {
    console.log('password ', password)
    User.findOne({where: {email: email}}).then(async (user) => {
      if(!user) {
        console.log('is there no user?');
        return done(null, false, {message: 'Not A Valid Email'});
      }
      try{
        if(await bcrypt.compare(password, user.password)) {
          console.log('is it true🤠');
          return done(null, user);
        }else {
          console.log('is it false🤮');
          return done(null, false, {message: 'Invalid password'});
        }
      } catch(e) {
        console.log('a');
        return done(e)
      }
    }).catch((user) => {
      return done(null, false, {message: "Not A Valid Email"});
    })
  }
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticate));
  passport.serializeUser((user, done) => {
    console.log('🤐');
    return done(null, user.id)});
  passport.deserializeUser((id, done) => {
    User.findOne({where: {id: id}}).then((user) => {
      return done(null, user)
    })
  });
}

module.exports = initialize;