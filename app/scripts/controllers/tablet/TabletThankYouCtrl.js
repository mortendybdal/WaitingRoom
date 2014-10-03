'use strict';

angular.module('waitingRoomApp')
    .controller('TabletThankYouCtrl', function ($scope, $rootScope, $interval, $location) {
        $rootScope.tablet_ui = true;
        $scope.reset_clock = 10;

        $scope.page_class = 'page-slide-up';

        function resetResponse () {
            $rootScope.response = {
                doctor: {},
                questions: {},
                scheme: null,
                patient: null
            };
        }

        function init() {

            $scope.reset_timer = $interval(function(){
                if ($scope.reset_clock === 0) {
                    $interval.cancel($scope.reset_timer);
                    resetResponse();
                    $location.path('tablet');
                } else {
                    $scope.reset_clock--;
                }
            }, 1000);
        }

        init();
    });
