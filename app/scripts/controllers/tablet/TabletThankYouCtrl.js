'use strict';

angular.module('waitingRoomApp')
    .controller('TabletThankYouCtrl', function ($scope, $rootScope, $interval, $location, $timeout,  Restangular) {
        $scope.basePatients = Restangular.all("patients");
        $scope.baseAnswers = Restangular.all("answers");

        $scope.is_loading = true;
        $rootScope.tablet_ui = true;
        $scope.reset_clock = 10;

        $scope.page_class = 'page-slide-in-right';

        function resetResponse () {
            $rootScope.response = {
                doctor: {},
                questions: {},
                scheme: null,
                patient: null
            };
        }

        function startCountDown () {
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

        function createAnswers (patient_id) {
            var answers = [];

            _.forEach($rootScope.response.questions, function (question) {
                if(question.Answer) {
                    var answer = {};
                    answer.AnswerText = question.Answer;
                    answer.Question_id = question._id;
                    answer.Patient_id = patient_id;
                    answers.push(answer);
                }
            });

            return answers;
        }

        function sendAnswersToDoctor() {
            if ($rootScope.response.scheme && $rootScope.response.doctor) {
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
            }
        }

        function init() {
            if (!$rootScope.response.doctor) {
                $location.path('tablet');
            }

            sendAnswersToDoctor();
        }

        init();
    });
