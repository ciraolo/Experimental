module.exports.permAreaManagerUp = function (req, res, next) {
  if (req.user.local.role === "Area Manager" || req.user.local.role === "Responsabile Operations") {
    return next();
  } else {
    var err = new Error('Cazzo mi dispiace, ma non hai i permessi per vedere questa pagina.');
    err.status = 401;
    return next(err);
  }
}

module.exports.permResponsabile = function (req, res, next) {
  if (req.user.local.role === "Responsabile Operations") {
    return next();
  } else {
    var err = new Error('Cazzo mi dispiace, ma non hai i permessi per vedere questa pagina.');
    err.status = 401;
    return next(err);
  }
}
