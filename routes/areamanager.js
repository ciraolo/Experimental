var permissions = require('../middlewares/permissions.js');

module.exports = function(app) {
  app.get('/areamanager', permissions.permAreaManagerUp, function(req, res) {
    res.render( 'areamanager' );
  });
};
