// CORE MODULES


// EXPRESS
var express = require('express');
var app = express();
var router = express.Router();


// DEPENDENCIES
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');


// CONFIG MODULES
var databaseConfig = require('./config/db');


// PORT
var port = process.env.PORT || 3000;


// DATABASE
mongoose.connect(databaseConfig.url + databaseConfig.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// PASSPORT
require('./config/passport')(passport); // pass passport for configuration


// SETS
app.use('/', express.static(__dirname + '/public'));
app.use('/dep', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');
app.use(flash()); // use connect-flash for flash messages stored in session

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// SESSIONS
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// make user available in templates
app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    delete req.user.local.password;
    res.locals.user = req.user;
  } else {
    res.locals.user = false;
  }
  next();
});


// ROUTES
require('./routes/index')(app);
require('./routes/signup')(app);
require('./routes/login')(app);
require('./routes/profile')(app);
require('./routes/logout')(app);
require('./routes/areamanager')(app);
require('./routes/responsabile')(app);


// ERROR HANDLER
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// LISTEN
app.listen(port);



// END OF THE WORLD 🌍
