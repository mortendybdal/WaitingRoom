'use strict';

angular.module('waitingRoomApp')
    .controller('TabletAppointmentTimeCtrl', function ($scope, $rootScope, $location, $routeParams) {
        var timestamp = moment(),
            minut_interval = 5;


        function init() {
            if (!$rootScope.tablet_user.doctor) {
                //Reset tablet user and redirect to frontpage
                $rootScope.resetTabletUser();
                $location.path('tablet');
            }

            if($rootScope.tablet_user.time) {
                timestamp = moment($rootScope.tablet_user.time);
            } else {
                timestamp.minute(Math.ceil(timestamp.minutes() / minut_interval) * minut_interval);
            }

            $scope.hour = timestamp.format('HH');
            $scope.minute = timestamp.format('mm');

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }

            if($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }
        }

        $scope.addMinutes = function () {
            timestamp.minute(timestamp.minute() + minut_interval);
            $scope.updateTime();
        };

        $scope.removeMinutes = function () {
            timestamp.minute(timestamp.minute() - minut_interval);
            $scope.updateTime();
        };

        $scope.addHour = function () {
            timestamp.hour(timestamp.hour() + 1);
            $scope.updateTime();
        };
        $scope.removeHour = function () {
            timestamp.hour(timestamp.hour() - 1);
            $scope.updateTime();
        };

        $scope.updateTime = function () {
            $scope.hour = timestamp.format('HH');
            $scope.minute = timestamp.format('mm');
        };

        $scope.nextSlide = function () {
            $rootScope.tablet_user.time = timestamp.format();
            $scope.page_class = 'page-slide-in-right';
            $location.path('/tablet/schemes/next');
        };


        $scope.backSlide = function () {
            $scope.page_class = 'page-slide-in-right revert';
            $location.path('/tablet/doctor/previous');
        };

        init();
    });
