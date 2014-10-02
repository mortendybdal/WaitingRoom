'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationCtrl', function ($scope, $rootScope, $location, $modal, $timeout, Auth) {
        $scope.auth = Auth;
        $scope.showContentTree = function () {
            $scope.show_content_tree = !$scope.show_content_tree;
        };

        $scope.hideContentTree = function () {
            console.log("Hide");
            $scope.show_content_tree = false;
        };

        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };
    });
