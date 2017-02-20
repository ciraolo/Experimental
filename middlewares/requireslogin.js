module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    var err = new Error('Devi effettuare l\'accesso per vedere questa pagina.');
    err.status = 401;
    return next(err);
  }
}
