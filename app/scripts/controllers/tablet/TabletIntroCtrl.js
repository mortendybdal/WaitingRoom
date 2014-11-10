'use strict';

angular.module('waitingRoomApp')
    .controller('TabletIntroCtrl', function ($scope, $rootScope, $routeParams, $location) {
        $scope.nextSlide = function () {
            $scope.page_class = 'page-slide-in-right';
            $location.path('/tablet/doctor/next')
        };

        function init () {
            $scope.page_class = 'page-fade-in';
        }

        init();
    });