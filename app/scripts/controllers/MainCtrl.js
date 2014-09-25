'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope, $timeout, Dictionary, Restangular) {
        $rootScope.response = {
            doctor: {},
            questions: {},
            scheme: null,
            patient: null
        };

        $rootScope.d = Dictionary.init('da');

        $rootScope.$on("event:load_start", function () {
            $scope.is_loading_content = true;
        });

        $rootScope.$on("event:load_stop", function () {
            $timeout(function () {
                $scope.is_loading_content = false;
            }, 300);
        });


        Restangular.one("tablets").get().then(function(tablet_response) {
            $rootScope.t = tablet_response;

            console.log(tablet_response);
        });

        $rootScope.$watch('response', function () {
            console.log($rootScope.response);
        }, true);
   });
