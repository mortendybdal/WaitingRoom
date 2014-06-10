'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope) {
        $scope.is_loading_content = true;
        console.log('MainCtrl init');

        $rootScope.$on("event:load_start", function () {
            $scope.is_loading_content = true;
        });

        $rootScope.$on("event:load_stop", function () {
            $scope.is_loading_content = false;
        });

        $scope.$watch("is_loading_content", function () {
           console.log($scope.is_loading_content);
        });
   });
