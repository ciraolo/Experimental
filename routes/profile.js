var requiresLogin = require('../middlewares/requireslogin.js');

module.exports = function(app) {
  app.get('/profile', requiresLogin, function(req, res) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
  });
};
