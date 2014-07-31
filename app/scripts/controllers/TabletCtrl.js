'use strict';

angular.module('waitingRoomApp')
    .controller('TabletCtrl', function ($scope, $rootScope, $timeout, Restangular) {
        $rootScope.hide_navigation_menu = true;
        $scope.index = -1;
        $scope.direction = "left";
        $scope.scheme_type = "none";

        $scope.baseSchemes = Restangular.all("schemes");
        $scope.basePatients = Restangular.all("patients");
        $scope.baseAnswers = Restangular.all("answers");

        $scope.baseSchemes.getList().then(function(schemes) {
            $scope.schemes = schemes;
            $timeout(function () {
                $rootScope.$broadcast("event:load_stop");
            });
        });

        $scope.nextSlide = function (question) {
            $scope.index++;
            $scope.direction = "left";

            console.log(question);
            if(question) {
                var answer = {
                    AnswerText: question.Answer,
                    Question_id: question._id,
                    Patient_id: $scope.patient._id
                };

                $scope.baseAnswers.post(answer);
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

            $scope.basePatients.post().then(function(patient) {
                $scope.patient = patient;

                console.log($scope.patient._id);
                console.log(schemeid);

                Restangular.one('patients', $scope.patient._id).one('schemes', schemeid).get().then(function (patient) {
                    $scope.questions = patient;

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
