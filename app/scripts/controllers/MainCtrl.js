'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope, $timeout, Dictionary, Restangular, Auth) {
        $scope.baseSchemes = Restangular.all("schemes");
        $rootScope.response = {
            doctor: {},
            questions: {},
            scheme: null,
            patient: null
        };

        $rootScope.d = Dictionary.init('da');
        console.log($rootScope.d);

        $rootScope.$watch('currentUser', function () {
            $scope.tablet_is_loading = true;
            if(Auth.roleHasAccess(['Tablet'])) {
                Restangular.one("tablets").get().then(function(tablet_response) {
                    $scope.tablet_is_loading = true;
                    $rootScope.t = tablet_response;
                });
            }
        });
   });
