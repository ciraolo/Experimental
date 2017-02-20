var User = require('../models/user');

module.exports = function(app) {

  app.get('/signup', function(req, res) {
    res.render('signup');
  });


  app.post('/signup', function(req, res, next) {
    if (req.body.username &&
        req.body.firstname &&
        req.body.lastname &&
        req.body.role &&
        req.body.password) {

          if (req.body.password === req.body.confirmPassword) {

            var newUser = User({
              local: {
              username: req.body.username,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              role: req.body.role,
              password: req.body.password}
            });

            newUser.save(function(err) {
              if (!err) {
                res.redirect('./profile');
              } else {
                return next(err);
              }
            });

          } else {
            var err = new Error('Le password inserite non corrispondono. 🐗');
            err.status = 400;
            return next(err);
          }

        } else {
          var err = new Error('Non hai inserito tutti i dati richiesti. 🐗');
          err.status = 400;
          return next(err);
        }

  });
};
