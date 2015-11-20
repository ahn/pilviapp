var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('./models').User;


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({where: {username: username}}).then(function(user) {
    done(null, user);
  },
  function (err) {
    done(err, false);
  });
});



passport.use(new LocalStrategy(
  function(username, password, done) {

    User.findOne({where: {username: username}}).then(function (user) {
      if (!user) {
        return done(null, false);
      }
      user.verifyPassword(password, function(err, result) {
        console.log("Roger Verified", err, result);
        if (err) {
          done(err, false); 
        }
        else if (!result) {
          done(null, false); 
        }
        else {
          done(null, user); 
        }
      });
    },
    function(user) {
      done(null, false);
    });
  }
));

// Autentikaatio-middleware
// https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  }
  else {
    next();
  }
}


router.get('/loggedin', function(req, res) {
  if (req.isAuthenticated()) {
    res.json({user: req.user});
  }
  else {
    res.json({user: null});
  }
  
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

router.post('/logout', function(req, res) {
  req.logout();
  res.json({"message": "Logout successful"});
});


module.exports = {
  auth: auth,
  passport: passport,
  router: router
};