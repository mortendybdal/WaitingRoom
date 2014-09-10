'use strict';

angular.module('waitingRoomApp')
    .controller('TabletDoctorListCtrl', function ($scope, $rootScope, $location) {
        $rootScope.tablet_ui = true;
        $rootScope.$broadcast("event:load_stop");

        $scope.page_class = 'page-slide-up';

        $scope.selectDoctor = function () {
            $location.path('tablet/schemes')
        }
    });
