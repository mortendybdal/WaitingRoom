'use strict';

angular.module('waitingRoomApp')
    .controller('PatientCtrl', function ($scope, $rootScope, $routeParams, $timeout, PatientService, QuestionService, AnswerService, _) {
        $scope.is_copying_jounal = false;
        $scope.is_loading_soap_widget = false;


        function init() {
            if($routeParams.id) {
                PatientService.getPatient($routeParams.id).then(function () {
                    if (PatientService.data){
                        $scope.patient = PatientService.data;

                        //TODO: Handle multiple schemes - for now only take the first
                        QuestionService.getQuestionsForScheme($scope.patient.Schemes[0]._id, $scope.patient._id).then(function () {
                            $scope.questions = QuestionService.data;

                            $scope.steps = _.sortBy(_.uniq(_.map($scope.questions, "Step"), "Title"), "SortOrder");

                            //Get all questions for the first step when you load page
                            $scope.setQuestions($scope.steps[0]);


                            generateJournal();

                            $rootScope.$broadcast("event:load_stop");
                        });
                    }
                });
            }
        }

        function getQuestionsByStep(step) {
            return _.sortBy(_.filter($scope.questions, function (q) {
                return q.Step._id === step._id;
            }), "SortOrder");
        }

        function generateJournal() {
            var j = "";

            _.forEach($scope.steps, function(step) {

                var step_questions = getQuestionsByStep(step);

                console.log(step_questions);

                _.forEach(step_questions, function(soap) {

                    if(soap.JournalText && soap.Answer) {
                        j += soap.JournalText.replace("{{}}", soap.Answer) + ", ";
                    }

                });

                j += '\n\n';
            });



            $scope.journal_text = j;
        }

        $scope.setQuestions = function(step) {
            $scope.is_loading_soap_widget = true;
            $scope.currentStep = step;

            $scope.soap_item_list = getQuestionsByStep(step);

            $timeout(function () {
                $scope.is_loading_soap_widget = false;
            }, 600);
        }

        $scope.saveAnswer = function (question) {
            if(question) {
                var answer = {
                    AnswerText: question.Answer,
                    Question_id: question._id,
                    Patient_id: $scope.patient._id
                };

                AnswerService.saveAnswer(answer).then(function () {
                    console.log("Answer Saved: ", AnswerService.data);
                });

                generateJournal();
            }
        }

        $scope.$watch("soap_item_list", function () {

        }, true);

        $scope.copyPast = function () {
            return $scope.journal_text;
        };

        $scope.copyPastEffect = function () {
            $scope.is_copying_jounal = true;
            $timeout(function () {
                $scope.is_copying_jounal = false;
            }, 300);
        };

        init();
    });
