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

        $rootScope.$watch('currentUser', function (new_val) {
            if(Auth.roleHasAccess(['Tablet'])) {
                Restangular.one("tablets").get().then(function(tablet_response) {
                    $rootScope.t = tablet_response;

                    console.log(tablet_response);
                });
            }
        });
   });
