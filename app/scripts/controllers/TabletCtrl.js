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

                $scope.baseAnswers.post(answer).then(function() {
                    console.log("Object saved OK");
                }, function() {
                    console.log("There was an error saving");
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

        $scope.createPatient = function (scheme) {
            //$rootScope.$broadcast("event:load_start");
            $scope.questions = _.find(scheme.steps, {'Title': "Subjective"}).questions;
            $scope.nextSlide();

            $scope.basePatients.post().then(function(patient) {
                $scope.patient = patient;

                patient.Schemes.push(scheme._id);
                patient.save();
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
