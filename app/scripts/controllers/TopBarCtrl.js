'use strict';

angular.module('waitingRoomApp')
  .controller('TopBarCtrl', function ($scope, $location, Auth, $rootScope) {
    $scope.logout = function () {
      Auth.logout()
        .then(function () {
          $location.path('/login');
        });
    };

    //Set listener
    $rootScope.$watch('patients', function (patients) {
      $scope.number_of_uncompleted_patients = _.where(patients, function (patient) {
        return patient.Status !== 'Completed';
      });
    }, true);
  });
