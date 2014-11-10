'use strict';

angular.module('waitingRoomApp')
    .controller('TabletDoctorListCtrl', function ($scope, $rootScope, $location, $routeParams, Auth, localStorageService) {
        function init() {
            $rootScope.tablet_ui = true;

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }

            if($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }
        }

        $scope.backSlide = function () {
            $scope.page_class = 'page-fade-out';
            $location.path('/tablet/previous');
        };

        $scope.selectDoctor = function (doctor) {
            $rootScope.tablet_user.doctor = doctor;
            $scope.page_class = 'page-slide-in-right';
            $location.path('tablet/appointment-time/next')
        }



        init();
    });
