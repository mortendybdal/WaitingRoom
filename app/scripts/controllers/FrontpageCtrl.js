'use strict';

angular.module('waitingRoomApp')
   .controller('FrontpageCtrl', function ($scope, $rootScope, PatientService) {

      PatientService.getAllPatients().then(function () {
          $scope.patients = PatientService.data;
          $rootScope.$broadcast("event:load_stop");
      });

      $scope.calcTimeSinceSubmition = function (time) {
          return window.moment(time).fromNow();
      };

      $scope.formatDateTime = function (time) {
          return window.moment(time).format('HH:mm');
      };
   });
