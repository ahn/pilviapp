var express = require('express');
var router = express.Router();

var models = require('./models');

var auth = require('./auth.js').auth;


router.get('/user', function (req, res) {
  
  models.User.findAll().then(function(users) {
    res.json(users);
  });

});


router.get('/user/:username', function(req, res) {
  var user;
  models.User.findOne(
    {where: {username: req.params.username}},
    {include: [ models.Message ]}).then(function(u) {
      user = u;
      if (!user) {
        throw {status: 404};
      }
      return user.getMessages();

  }).then(function(messages) {
    var u = user.toJSON();
    u.messages = messages;
    res.json(u);
  }, function(err) {
    var status = err.status || 500;
    res.sendStatus(status);
  });
});

router.post('/user', function (req, res) {
  
  var username = req.body.username;
  var realname = req.body.realname;
  var password = req.body.password;
  
  models.User.create({
    username: username,
    realname: realname,
    password: password
  }).then(function(user) {
    res.json(user);
  },
  function(err) {
    if (err.name==='SequelizeUniqueConstraintError') {
      res.status(409).json({error: "User already exists."});
    }
    else {
      res.status(500).json({error: "Database error"});
    }
    
  });

});

router.post('/user/:username/messages', auth, function(req, res) {

  models.Message.create({text: req.body.text}).then(function(message) {
    return req.user.addMessage(message);
  }).then(function() {
    res.json(req.user);
  }, function() {
    res.status(500).json({error: "Database error"});
  });
  
});

router.get('/user/:username/messages', auth, function(req, res) {
  
  models.User.findOne({where: {username: req.params.username}}).then(function (user) {
    return user.getMessages();
  }).then(function(messages) {
    res.json(messages);
  }, function() {
    res.status(500).json({error: "Database error"});
  });
  
});


module.exports = router;