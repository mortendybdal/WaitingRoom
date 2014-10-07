'use strict';

angular.module('waitingRoomApp')
    .controller('FrontpageCtrl', function ($scope, $rootScope, $interval, Restangular, patients, $window, $filter) {
        var orderBy = $filter('orderBy');
        $scope.patients = patients;
        $scope.order_by = '';

        $scope.calcTimeSinceSubmition = function (time) {
            return $window.moment(time).zone('0000').fromNow();
        };

        $scope.timeForAppointment = function (time) {
            return $window.moment(time).zone('0000').format('HH:mm');
        };

        $scope.dateForAppointment = function (time) {
            return $window.moment(time).zone('0000').format('Do MMMM YYYY');
        };

        $scope.order = function (predicate, reverse) {
            $scope.order_by = predicate;
            $scope.patients = orderBy($scope.patients, predicate, reverse);
        };

        function init() {
            _.forEach($scope.patients, function (patient) {
                patient.SchemeTitle = patient.Schemes[0].Title;
                patient.DateForAppointment = $scope.dateForAppointment(patient.TimeOfAppointment);
                patient.TimeForAppointment = $scope.timeForAppointment(patient.TimeOfAppointment);
                patient.Submitted = $scope.calcTimeSinceSubmition(patient.Submitted);
            });

            $scope.order('DateForAppointment', false);
        }

        init();
    });
