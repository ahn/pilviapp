var express = require('express');
var bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('./auth.js').passport;

var app = express();


app.use(express.static('./client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'fjioaVFNanisof', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', require('./auth.js').router);

app.use('/api', require('./api.js'));






module.exports = app;