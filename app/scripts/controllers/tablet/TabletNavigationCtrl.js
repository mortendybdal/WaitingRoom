'use strict';

angular.module('waitingRoomApp')
    .controller('TabletNavigationCtrl', function ($scope, $location, $rootScope) {
        $scope.tablet_navigation_expanded = false;

        function resetResponse () {
            $rootScope.response = {
                doctor: {},
                questions: {},
                scheme: null,
                patient: null
            };
        }

        $scope.onClickHome = function () {
            resetResponse();
            $scope.tablet_navigation_expanded = false;
            $location.path('/tablet/');
        }
    });
