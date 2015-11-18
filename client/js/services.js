/* globals angular */
"use strict";

var pilviAppServices = angular.module('pilviAppServices', ['ngResource']);

pilviAppServices.factory('User',
  function($resource) {
    
    var UserResource = $resource('/api/user');
    
    function getAll() {
      return UserResource.query();
    }
    
    function getOne(username) {
      return $resource('/api/user/:username', {username: username}).get();
    }
    
    function create(params) {
      var u = new UserResource(params);
      return u.$save();
    }
    
    return {
      getAll: getAll,
      getOne: getOne,
      create: create
    };
  }
);

pilviAppServices.factory('Auth',
  function($http, $q) {
    var loggedInUser = null;
    function login(username, password) {
      return $http({
        method: 'POST',
        url: '/auth/login',
        data: {username: username, password: password}
      }).then(function(response) {
        loggedInUser = response.data;
        return response.data;
      });
    }
    
    function loggedIn() {
      
      if (loggedInUser) {
        var deferred = $q.defer();
        deferred.resolve(loggedInUser);
        return deferred.promise;
      }
      else {
        return $http({
          method: 'GET',
          url: '/auth/loggedin'
        }).then(function(response) {
          loggedInUser = response.data.user;
          return loggedInUser;
        }, function() {
          loggedInUser = null;
          return loggedInUser;
        });
      }
      
    }
    
    function logout() {
      return $http({
        method: 'POST',
        url: '/auth/logout'
      }).then(function(response) {
        loggedInUser = null;
      },
      function() {
        
      });
    }
    
    return {
      logout: logout,
      login: login,
      loggedIn: loggedIn,
      getLoggedInUser: function() { return loggedInUser; }
    };
    
  }
);

pilviAppServices.factory('Message',
  function($resource) {
    function create(username, text) {
      var MessageResource = $resource(
        '/api/user/:username/messages',
        {username: username});
      var msg = new MessageResource({text: text});
      return msg.$save();
    }
    
    function getOfUser(username) {
      var MessageResource = $resource(
        '/api/user/:username/messages',
        {username: username});
      return MessageResource.query();
    }

    return {
      create: create,
      getOfUser: getOfUser
    };
  }
);
