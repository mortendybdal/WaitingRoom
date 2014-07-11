'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationCtrl', function ($scope, $location, Auth) {
        $scope.logout = function() {
            console.log("Logout?");

            Auth.logout()
                .then(function() {
                    $location.path('/login');
                });
        };
    });
