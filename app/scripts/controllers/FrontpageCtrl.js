'use strict';

angular.module('waitingRoomApp')
   .controller('FrontpageCtrl', function ($scope, $rootScope, $interval, Restangular) {

      $scope.basePatients = Restangular.all("patients");

      $scope.basePatients.getList().then(function(patients) {
          $scope.patients = patients;
          $rootScope.$broadcast("event:load_stop");
      });

      $scope.calcTimeSinceSubmition = function (time) {
          return window.moment(time).zone('0000').fromNow();
      };

      $scope.formatDateTime = function (time) {
          return window.moment(time).zone('0000').format('HH:mm');
      };

   });
