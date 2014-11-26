'use strict';

angular.module('waitingRoomApp')
    .controller('TabletIntroCtrl', function ($scope, $rootScope, $routeParams, $location, Restangular, localStorageService) {
        $scope.nextSlide = function () {
            //Cleanup old patient => submitting or deleting depending on patient status
            if (localStorageService.get('tablet_user')) {
                var old_tablet_user = localStorageService.get('tablet_user');

                Restangular.one("patients", old_tablet_user._id).remove().then(function () {
                    console.log('Remove patient from local storage');
                    localStorageService.clearAll();
                });
            }

            $rootScope.tablet_user = {};
            $scope.page_class = 'page-slide-in-right';
            $location.path('/tablet/doctor/next');
        };

        function init () {
            $scope.page_class = 'page-fade-in';
        }

        init();
    });