/* globals angular */
"use strict";

var pilviAppControllers = angular.module('pilviAppControllers', []);

pilviAppControllers.controller('EtusivuController',
  function($scope, Auth, User, loggedInUser) {
    $scope.loggedInUser = loggedInUser;
    $scope.users = User.getAll();
  }
);

pilviAppControllers.controller('UserHomeController',
  function($scope, $routeParams, User, Auth, loggedInUser, allUsers, Notification) {
    $scope.loggedInUser = loggedInUser;
    $scope.users = allUsers;
    
    $scope.logout = function() {
      Auth.logout().then(function() {
        Notification.success("Uloskirjautuminen onnnistui");
        $scope.loggedInUser = null;
      });
    }
  }
);

pilviAppControllers.controller('UserController',
  function($scope, $routeParams, User, Auth, Message, loggedInUser, activeUser, allUsers) {
    $scope.loggedInUser = loggedInUser;
    if (activeUser) {
        $scope.activeUser = activeUser;
        $scope.messages = activeUser.messages;
    }
    $scope.users = allUsers;
    $scope.sendmessage = function(text) {
      Message.create($scope.loggedInUser.username, text).then(function() {
        $scope.messages = Message.getOfUser($scope.activeUser.username);
      });
    }
  }
);

pilviAppControllers.controller('RegisterController',
  function($scope, $routeParams, $location, Notification, User, loggedInUser) {
    $scope.loggedInUser = loggedInUser;
    $scope.register = function() {
      User.create({
        username: $scope.username,
        password: $scope.password,
        realname: $scope.realname
      }).then(function(u) {
        Notification.success('Tervetuloa, ' + u.realname);
        $location.url('/user/' + u.username);
      },
      function(err) {
        Notification.error(err.data.error);
      })
    }
  }
);

pilviAppControllers.controller('LoginController',
  function($scope, $routeParams, $location, Notification, Auth, loggedInUser) {
    $scope.loggedInUser = loggedInUser;
    $scope.login = function() {
      Auth.login($scope.username, $scope.password).then(function(u) {
        console.log("jee");
        Notification.success('Tervetuloa, ' + u.realname);
        $location.url('/user/' + u.username);
      },
      function() {
        Notification.error("Kirjautuminen ei onnistunut");
      })
    }
  }
);
