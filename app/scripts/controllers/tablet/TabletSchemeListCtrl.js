'use strict';

angular.module('waitingRoomApp')
    .controller('TabletSchemeListCtrl', function ($scope, $rootScope) {
        $rootScope.tablet_ui = true;
        $rootScope.$broadcast("event:load_stop");

        $scope.page_class = 'page-slide-up';
    });
