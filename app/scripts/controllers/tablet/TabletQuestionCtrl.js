'use strict';

angular.module('waitingRoomApp')
    .controller('TabletQuestionCtrl', function ($scope, $rootScope) {
        $rootScope.tablet_ui = true;
        $rootScope.$broadcast("event:load_stop");

        $scope.page_class = 'page-slide';
    });
