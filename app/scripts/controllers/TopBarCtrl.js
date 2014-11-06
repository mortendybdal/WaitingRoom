'use strict';

angular.module('waitingRoomApp')
    .controller('TopBarCtrl', function ($scope, $location, Auth) {
        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };
    });
