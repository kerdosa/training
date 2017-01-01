/**
 * The Express app entry point for backend.
 *
 * @version 1.0
 */
'use strict';


const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('underscore');
const path = require('path');
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const routeHelper = require('./helpers/routeHelper');
const User = require('./models').User;

const app = express();
app.set('port', config.SERVER_PORT);

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// initialize passport
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId, done);
});

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET,
  store: new MongoStore({url: config.MONGODB_URL})
}));
app.use(passport.initialize());
app.use(passport.session());

//load all routes
const routes = require('./routes');
_.each(routes, function(verbs, url) {
  _.each(verbs, function(def, verb) {
    let actions = [];

    if (!def.public) {
      actions.push(routeHelper.requireLogin);
    }
    if (def.admin) {
      actions.push(routeHelper.requireAdmin);
    }

    const method = require('./controllers/' + def.controller)[def.method];
    if (!method) {
      throw new Error(def.method + ' is undefined');
    }
    actions.push(function (req, res, next) {
      try {
        method(req, res, next);
      } catch (e) {
        next(e);
      }
    });
    app[verb](url, actions);
  });
  app.all(url, routeHelper.notAllowedHandler);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(routeHelper.errorHandler);


/* Start server */
const server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
