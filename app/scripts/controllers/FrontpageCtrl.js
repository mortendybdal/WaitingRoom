'use strict';

angular.module('waitingRoomApp')
   .controller('FrontpageCtrl', function ($scope, $rootScope, $interval, Restangular, patients) {

      $scope.patients = patients;


      $scope.calcTimeSinceSubmition = function (time) {
          return window.moment(time).zone('0000').fromNow();
      };

      $scope.formatDateTime = function (time) {
          return window.moment(time).zone('0000').format('HH:mm');
      };

   });
