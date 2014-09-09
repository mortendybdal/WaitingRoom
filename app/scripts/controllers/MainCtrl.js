'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope, $timeout, Dictionary) {
        $rootScope.$on("event:load_start", function () {
            $scope.is_loading_content = true;
        });

        $rootScope.$on("event:load_stop", function () {
            $timeout(function () {
                $scope.is_loading_content = false;
            }, 300);
        });

        $rootScope.d = Dictionary.init('da');
   });
