'use strict';

angular.module('waitingRoomApp')
    .controller('TabletDoctorListCtrl', function ($scope, $rootScope, $location, $routeParams, Auth, localStorageService) {
        function init() {
            $rootScope.tablet_ui = true;
            $scope.page_class = 'page-slide-in-right';

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }
        }

        $scope.backSlide = function () {
            $scope.page_class = 'page-fade-out';
            $location.path('/tablet/previous');
        };

        $scope.selectDoctor = function (doctor) {
            //localStorageService.set(CURRENT_USER, doctor);
            $rootScope.response.doctor = doctor;
            $scope.page_class = 'page-slide-in-right';
            $location.path('tablet/schemes/next')
        }



        init();
    });
