var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'local.username' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          return done(null, false,
            req.flash('message', 'Non ho trovato l\'utente '+ username));
        }
        // User exists but wrong password, log the error
        if (!user.isValidPassword(password)){
          return done(null, false,
            req.flash('message', 'Password non valida'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));












};
