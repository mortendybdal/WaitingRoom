'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationCtrl', function ($scope, $location, Auth, Restangular) {
        $scope.baseSchemes = Restangular.all("schemes");
        $scope.expanded_items = [];

        $scope.baseSchemes.getList().then(function(schemes) {
            $scope.schemes = schemes;
        });

        $scope.logout = function() {
            console.log("Logout?");

            Auth.logout()
                .then(function() {
                    $location.path('/login');
                });
        };

        $scope.expandContentTree = function (item) {
            if(_.contains($scope.expanded_items, item._id)) {
                _.remove($scope.expanded_items, function(id) { return id === item._id; });
            }else {
                $scope.expanded_items.push(item._id);
            }
        };

        $scope.contentItemIsOpen = function (item) {
            return _.contains($scope.expanded_items, item._id);
        };
    });
