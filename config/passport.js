//const flash = require('connect-flash');
const passport = require('passport');

//const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../server.js');  // Path to User model


module.exports = passport;

passport.use('local-login',new LocalStrategy({
    usernameField: 'name',  // Default is 'username'
    passwordField: 'password',  // Default is 'password'
    passReqToCallback: true     // Pass request to the callback, useful for custom needs
  },
  function(name, password, done) {
    //console.log(name)
    User.findOne({ username: name }, (err, user)=> {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


