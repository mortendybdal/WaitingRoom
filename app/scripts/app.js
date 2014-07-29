'use strict';

angular.module('waitingRoomApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ngAnimate-animate.css',
  'xeditable',
  'ngClipboard',
  'slick',
  'restangular'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    //================================================
    // Check if the user is connected
    //================================================
    /*var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('api/loggedin').success(function(user){
            // Authenticated
            if (user !== '0') {
                $rootScope.is_logged_in = true;
                $timeout(deferred.resolve, 0);
            }else { // Not Authenticated
                $rootScope.is_logged_in = false;
                $timeout(function(){deferred.reject();}, 0);
                $location.url('/login');
            }
        });

        return deferred.promise;
    };*/

    //================================================
    // Define all the routes
    //================================================

    $routeProvider
      .when('/', {
        templateUrl: 'partials/frontpage',
        controller: 'FrontpageCtrl',
        resolve: {
            loggedin: function (Auth) {
                return Auth.checkLoggedin();
            }
        }
      })
      .when('/patient/:step/:id', {
          templateUrl: 'partials/patient',
          controller: 'PatientCtrl',
          resolve: {
              loggedin: function (Auth) {
                  return Auth.checkLoggedin();
              }
          }
      })
      .when('/tablet', {
         templateUrl: 'partials/tablet',
         controller: 'TabletCtrl'
      })
        .when('/settings', {
         templateUrl: 'partials/settings',
         controller: 'SettingsCtrl',
         resolve: {
             loggedin: function (Auth) {
                 return Auth.checkLoggedin();
             }
         }
      })
      .when('/login', {
         templateUrl: 'partials/login',
         controller: 'LoginCtrl'
      })
      .when('/signup', {
          templateUrl: 'partials/signup',
          controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth, Restangular) {

    //================================================
    // Configure restangular
    //================================================
    Restangular.setBaseUrl('api');

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      $rootScope.$broadcast("event:load_start");

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });