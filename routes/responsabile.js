var permissions = require('../middlewares/permissions.js');

module.exports = function(app) {
  app.get('/responsabile', permissions.permResponsabile, function(req, res) {
    res.render( 'responsabile' );
  });
};
