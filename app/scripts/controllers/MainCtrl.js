'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope) {
        $rootScope.$on("event:load_start", function () {
            $scope.is_loading_content = true;
        });

        $rootScope.$on("event:load_stop", function () {
            $scope.is_loading_content = false;
        });
   });
