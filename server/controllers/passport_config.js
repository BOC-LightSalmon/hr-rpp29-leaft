const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../../db/models/users');


const initialize = (passport) => {
  const authenticate = (email, password, done) => {
    console.log('password ', password)
    User.findOne({where: {email: email}}).then(async (user) => {
      console.log('is this excuted', user.password)
      if(!user) {
        return done(null, fasle);
      }
      try{
        if(await bcrypt.compare(password, user.password)) {
          console.log('is it true🤠');
          return done(null, user);
        }else {
          console.log('is it false🤮');
          return done(null, false);
        }
      } catch(e) {
        console.log('wtf');
        return done(e)
      }
    })
  }
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticate));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;