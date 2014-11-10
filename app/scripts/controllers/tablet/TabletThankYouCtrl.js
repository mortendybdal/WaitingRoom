'use strict';

angular.module('waitingRoomApp')
    .controller('TabletThankYouCtrl', function ($scope, $rootScope, $interval, $location, $timeout,  Restangular) {
        $scope.basePatients = Restangular.all("patients");
        $scope.baseAnswers = Restangular.all("answers");

        $scope.is_loading = true;
        $scope.reset_clock = 10;

        $scope.page_class = 'page-slide-in-right';

        function init() {


            if (!$rootScope.tablet_user.id) {
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
            Restangular.one('patients', $rootScope.tablet_user.id).post(['Submitted']).then(function () {
                $timeout(function () {
                    $scope.is_loading = false;
                    startCountDown();
                }, 2000);
            });


            /*if ($rootScope.response.scheme && $rootScope.response.doctor) {
                $scope.basePatients.post({Doctor: $rootScope.response.doctor._id}).then(function(patient) {
                    $rootScope.response.patient = patient._id;
                    patient.Schemes.push($rootScope.response.scheme);
                    patient.save();

                    var answers = createAnswers(patient._id)

                    if(answers.length > 0) {
                        $scope.baseAnswers.post(answers).then(function (){

                            $timeout(function () {
                                $scope.is_loading = false;
                                startCountDown();
                            }, 2000);

                        });
                    }else {
                        $scope.is_loading = false;
                    }
                });
            }*/
        }

        init();
    });
