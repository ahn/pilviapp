/* globals angular */
'use strict';

var pilviApp = angular.module('pilviApp', [
  'ngRoute',
  'ui-notification',
  'pilviAppControllers',
  'pilviAppServices'
]);

pilviApp.config(
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'EtusivuController',
        resolve: {
          loggedInUser: function(Auth) {
            return Auth.loggedIn();
          }
        }
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController',
        resolve: {
          loggedInUser: function(Auth) {
            return Auth.loggedIn();
          }
        }
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterController',
        resolve: {
          loggedInUser: function(Auth) {
            return Auth.loggedIn();
          }
        }
      }).
      when('/user', {
        templateUrl: 'partials/user.html',
        controller: 'UserHomeController',
        resolve: {
          loggedInUser: function(Auth) {
            return Auth.loggedIn();
          },
          allUsers: function(User) {
            return User.getAll();
          }
        }
      }).
      when('/user/:username', {
        templateUrl: 'partials/user.html',
        controller: 'UserController',
        resolve: {
          loggedInUser: function(Auth) {
            return Auth.loggedIn();
          },
          allUsers: function(User) {
            return User.getAll();
          },
          activeUser: function($route, User) {
            var u =  User.getOne($route.current.params.username);
            return u.$promise.then(function(user) {
               return user;
            },
            function() {
                return null;
            });
          }
        }
      }).
      otherwise({
        redirectTo: '/home'
      });
  }
);