'use strict';

angular.module('waitingRoomApp')
    .controller('TabletFinishCtrl', function ($scope, $rootScope, $location, Restangular) {
        $scope.basePatients = Restangular.all("patients");
        $scope.baseAnswers = Restangular.all("answers");

        $scope.is_loading = false;
        $rootScope.tablet_ui = true;
        $rootScope.$broadcast("event:load_stop");
        $scope.page_class = 'page-slide-up';

        if (!$rootScope.response.doctor.name) {
            $location.path('tablet');
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



        $scope.sendAnswersToDoctor = function () {
            $scope.is_loading = true;

            if ($rootScope.response.scheme && $rootScope.response.doctor) {
                $scope.basePatients.post({Doctor: $rootScope.response.doctor._id}).then(function(patient) {
                    $rootScope.response.patient = patient._id;
                    patient.Schemes.push($rootScope.response.scheme);
                    patient.save();

                    var answers = createAnswers(patient._id)

                    if(answers.length > 0) {
                        $scope.baseAnswers.post(answers).then(function (){
                            $location.path('tablet/thankyou');
                        });
                    }
                });
            } else {
                console.error("Scheme id is not set on rootScope.");
            }

        }

    });
