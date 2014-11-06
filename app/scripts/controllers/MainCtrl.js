'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope, $timeout, Dictionary, Restangular, Auth) {
        $scope.baseSchemes = Restangular.all("schemes");
        $rootScope.response = {
            doctor: undefined,
            questions: undefined,
            scheme: null,
            patient: null
        };

        $rootScope.d = Dictionary.init('da');

        $rootScope.$watch('currentUser', function () {
            if(Auth.roleHasAccess(['Tablet'])) {
                $scope.tablet_is_loading = true;
                Restangular.one("tablets").get().then(function(tablet_response) {
                    $scope.tablet_is_loading = false;
                    $rootScope.t = tablet_response;
                });
            }
        });

        $scope.showContentTree = function () {
            $scope.show_content_tree = !$scope.show_content_tree;
        };

        $scope.hideContentTree = function () {
            $scope.show_content_tree = false;
        };
   });
