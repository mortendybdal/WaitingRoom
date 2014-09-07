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

        function injectSubquestions() {
            var updated_questions = [],
                sort_order = 0;

            //TODO - RENS DET HER SLAGER KODE OG FÅ DEN FØRSTE DEL DER FJERNER UØNSKET QUESTIONS TIL AT VIRKE!!

            _.forEach($scope.questions, function (question) {
                console.log("Clean out procedure", question);
                if(question && question.ParentQuestion) {
                    var parent = _.find($scope.questions, function (q) { return q._id === question.ParentQuestion;});

                    if(parent.Answer && parent.Answer !== question.CorrectAnswer.Value) {
                        _.remove($scope.questions, function (q) { return q._id === question._id});
                    }
                }
            });


            _.forEach(_.sortBy($scope.questions, "SortOrder"), function (question) {
                question.SortOrder = sort_order;
                sort_order++;
                updated_questions.push(question);

                _.forEach(_.sortBy(question.questions, "SortOrder"), function (subquestion) {

                    if(subquestion.CorrectAnswer && question.Answer) {

                        if(question.Answer === subquestion.CorrectAnswer.Value && question._id !== subquestion._id) {
                            if(!_.find($scope.questions, function(q) {return q._id === subquestion._id;})) {
                                subquestion.SortOrder = sort_order;
                                sort_order++;
                                updated_questions.push(subquestion);
                            }
                        }
                    }
                });

            });

            $scope.questions = updated_questions;
        }

        $scope.baseSchemes.getList().then(function(schemes) {
            $scope.schemes = schemes;
            $timeout(function () {
                $rootScope.$broadcast("event:load_stop");
            });
        });

        $scope.nextSlide = function (question) {
            if(question) {
                injectSubquestions();

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

            $timeout(function () {
                $scope.index++;
                $scope.direction = "left";
            }, 0);
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
            $scope.questions = _.find(scheme.steps, {'SortOrder': 0}).questions;
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
