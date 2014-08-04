'use strict';

angular.module('waitingRoomApp')
    .controller('SchemeBuilderCtrl', function ($scope, $rootScope, $routeParams, Restangular) {
        $scope.baseSchemes = Restangular.all("schemes");

        if ($routeParams.id) {
            Restangular.one('schemes', $routeParams.id).get().then(function (scheme) {
                $scope.scheme = scheme;
                console.log($scope.scheme);
                $rootScope.$broadcast("event:load_stop");
            });
        }

        $scope.save = function (form) {
            $scope.submitted = true;

            if (form.$valid) {

                console.log(form);
                $scope.scheme.save().then(function (t) {
                    $rootScope.$broadcast("event:update_content_tree");
                });
            }
        };
    });
