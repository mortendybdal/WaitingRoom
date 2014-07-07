'use strict';

angular.module('waitingRoomApp')
    .controller('TabletCtrl', function ($scope, $rootScope, $timeout, PatientService, SchemeService, AnswerService) {
        $rootScope.hide_navigation_menu = true;
        $scope.index = -1;
        $scope.direction = "left";
        $scope.scheme_type = "none";

        SchemeService.getAllSchemes().then(function () {
            $scope.schemes = SchemeService.data;
            $timeout(function () {
                $rootScope.$broadcast("event:load_stop");
            });
        });

        $scope.nextSlide = function (question) {
            $scope.index++;
            $scope.direction = "left";

            if(question) {
                var answer = {
                    AnswerText: question.Answer,
                    Question_id: question._id,
                    Patient_id: $scope.patient._id
                };

                AnswerService.saveAnswer(answer).then(function () {
                    console.log("Answer Saved: ", AnswerService.data);
                });
            }

        };

        $scope.backSlide = function () {
            $scope.index--;
            $scope.direction = "right";
        };

        $scope.finishQuestionary = function () {
            $scope.nextSlide();
        };

        $scope.createPatient = function (schemeid) {
            $rootScope.$broadcast("event:load_start");
            $scope.hide_scheme_list = true;

            PatientService.createPatient().then(function () {
                $scope.patient = PatientService.data;

                PatientService.appendSchemeToPatient(schemeid, $scope.patient).then(function () {

                    $scope.questions = PatientService.data;

                    $timeout(function () {
                        $scope.hide_scheme_list = false;
                        $rootScope.$broadcast("event:load_stop");
                        $scope.nextSlide();
                    }, 1000);
                });
            });
        };

        $scope.getNumberOfSlidesShown = function(options) {
            if(options.length < 4) {
                return options.length;
            } else {
                return 3;
            }
        };
    });
