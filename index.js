var createError = require('http-errors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const session = require("express-session");
const MongoStore = require('connect-mongo');
require('dotenv').config();


// Set up mongoose connection
var mongoose = require('mongoose');
// Env variable for connection string
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Import routes
var indexRouter = require('./routes/indexRouter');
var apiRouter = require('./routes/api');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); //Compress all routes
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// Secure log-in using passport and bcrypt
passport.use("local", new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username" });
    bcrypt.compare(password, user.password, (err, res) => {
      console.log(res);
      if (err) return done(err);
      // Passwords match, log user in!
      if (res) return done(null, user);
      // Passwords do not match!
      else return done(null, false, { message: "Incorrect password" });
    });
  });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


// Access the user object from anywhere in our application
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Initialize routers, must come after app.use(session)
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
