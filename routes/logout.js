module.exports = function(app) {
  app.get('/logout', function(req, res) {
      // delete session object
      req.logout();
      req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
      });
  });
};
