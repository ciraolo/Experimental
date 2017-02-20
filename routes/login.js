var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('message') });
  });


  app.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));
};
