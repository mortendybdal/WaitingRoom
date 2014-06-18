'use strict';

angular.module('waitingRoomApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ngAnimate-animate.css',
  'xeditable',
  'ngClipboard'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/frontpage',
        controller: 'FrontpageCtrl'
      })
      .when('/patient/:step/:id', {
          templateUrl: 'partials/patient',
          controller: 'PatientCtrl'
      })
      .when('/tablet', {
         templateUrl: 'partials/tablet',
         controller: 'TabletCtrl'
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
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      $rootScope.$broadcast("event:load_start");
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });