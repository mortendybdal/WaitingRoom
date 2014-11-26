'use strict';

angular.module('waitingRoomApp')
    .controller('TabletThankYouCtrl', function ($scope, $rootScope, $interval, $location, $timeout,  Restangular) {
        $scope.basePatients = Restangular.all("patients");
        $scope.baseAnswers = Restangular.all("answers");

        $scope.is_loading = true;
        $scope.reset_clock = 10;

        $scope.page_class = 'page-slide-in-right';

        function init() {
            if (!$rootScope.tablet_user) {
                $location.path('tablet');
            }

            submitAnswersToDoctor();
        }

        function startCountDown () {
            $scope.reset_timer = $interval(function(){
                if ($scope.reset_clock === 0) {
                    $interval.cancel($scope.reset_timer);
                    $rootScope.resetTabletUser();
                    $location.path('tablet');
                } else {
                    $scope.reset_clock--;
                }
            }, 1000);
        }

        function submitAnswersToDoctor() {
            console.log(moment().format());

            $rootScope.tablet_user.Submitted = moment().format();
            $rootScope.tablet_user.Status = 'Submitted';
            $rootScope.tablet_user.save().then(function () {
                $timeout(function () {
                    $scope.is_loading = false;
                    startCountDown();
                }, 2000);
            });
        }

        init();
    });
