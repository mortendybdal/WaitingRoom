'use strict';

angular.module('waitingRoomApp')
    .controller('FrontpageCtrl', function ($scope, $rootScope, $interval, Restangular, $window, $filter, patients) {

        $rootScope.patients = patients;
        $rootScope.current_url = 'home';
        $scope.order_by = [];
        $scope.reverse = true;
        var orderBy = $filter('orderBy');


        $scope.timeForAppointment = function (time) {
          console.log();
            return $window.moment(time).zone('+0100').format('HH:mm Do MMMM YYYY');
        };

        $scope.timeForSubmit = function (time) {
            return $window.moment(time).zone('+0100').format('HH:mm Do MMMM YYYY');
        };

        $scope.order = function (predicate) {
          $scope.order_by = predicate;
          $rootScope.patients = _.sortBy($rootScope.patients, predicate);
        };

        function init() {
            _.forEach($rootScope.patients, function (patient) {
                patient.SchemeTitle = patient.Schemes[0].Title;
            });

            $scope.order('TimeOfAppointment');
        }

        init();
    });
