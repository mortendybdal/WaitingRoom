'use strict';

angular.module('waitingRoomApp')
    .controller('SideBarCtrl', function ($scope, $rootScope, $location, $modal, $timeout, Auth) {
        $scope.auth = Auth;

    });
