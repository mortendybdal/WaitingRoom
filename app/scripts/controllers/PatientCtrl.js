'use strict';

angular.module('waitingRoomApp')
    .controller('PatientCtrl', function ($scope, $rootScope, $routeParams, $timeout, $location, $document, Restangular, patient) {
        $scope.is_copying_jounal = false;
        $scope.is_loading_soap_widget = false;
        $scope.baseAnswers = Restangular.all("answers");

        function init() {
            $scope.patient = patient.patient;
            $scope.scheme = $scope.patient.Schemes[$routeParams.scheme];
            $scope.questions = patient.questions;
            $scope.steps = _.sortBy(_.uniq(_.map($scope.questions, "Step"), "Title"), "SortOrder");

            //Get all questions for the first step when you load page
            if ($scope.steps[1]) {
                $scope.setQuestions($scope.steps[1]);
            } else if ($scope.steps[0]) {
                $scope.setQuestions($scope.steps[0]);
            } else {
                $location.path('/');
            }

            generateJournal();
        }

        $scope.calcTimeSinceSubmition = function (time) {
            return window.moment(time).zone('0000').fromNow();
        };

        $scope.formatDateTime = function (time) {
            return window.moment(time).zone('0000').format('HH:mm');
        };

        $scope.setFocusOnFirstOption = function (selector, question) {
            $timeout(function () {
                //Try select radio list
                var inputs = $('#select-' + selector + " input[type='radio']");

                //If is a radio list
                if (inputs.length !== 0) {
                    inputs.bind('keydown', function(event) {
                        if (event.which === 13) {

                            //Reset all radio buttons
                            _.forEach(inputs, function (input) {
                              $(input).prop("checked", false);
                            });


                            question.Answer = $(this).val();
                            $(this).prop("checked", true);

                            //Save question
                            $scope.saveAnswer(question);
                        }
                    });
                } //Try select select list
                else {
                  inputs = $('#select-' + selector);
                }
                inputs[0].focus();
            }, 100);
        };

    $scope.setFocusOnNextElementOnHide = function (selector) {

        var current_soap_question = $('a[e-id="select-' + selector + '"]'),
            soap_question = $('.patient-soap__item--answer'),
            next_index = soap_question.index(current_soap_question) + 1;

        soap_question[next_index].focus();
    };

        function getQuestionsByStep(step) {
            return _.sortBy(_.filter($scope.questions, function (q) {
                return q.Step._id === step._id;
            }), "SortOrder");
        }

        function generateJournal() {
            var j = "";

            _.forEach($scope.steps, function (step) {

                var step_questions = getQuestionsByStep(step);


                _.forEach(step_questions, function (question) {

                    if (question.JournalText && question.Answer) {

                        //Special journal formatting for select list - pipe seperator
                        if (question.Type.Value === 'select-list') {
                            var concat_string = question.Answer.toString().replace(/,/g, "|");
                            j += question.JournalText.replace("{{}}", concat_string) + ", ";
                        }else {
                            j += question.JournalText.replace("{{}}", question.Answer) + ", ";
                        }
                    }

                    _.forEach(question.questions, function (subquestion) {


                        if (subquestion.CorrectAnswer && question.Answer === subquestion.CorrectAnswer.Key) {
                            if (subquestion.JournalText && subquestion.Answer) {

                                //Special journal formatting for select list - pipe seperator
                                if (subquestion.Type.Value === 'select-list') {
                                    var concat_string = subquestion.Answer.toString().replace(/,/g, "|");
                                    j += subquestion.JournalText.replace("{{}}", concat_string) + ", ";
                                }else {
                                    j += subquestion.JournalText.replace("{{}}", subquestion.Answer) + ", ";
                                }
                            }
                        }
                    });

                });

                j += '\n\n';
            });


            $scope.journal_text = j;
        }

        $scope.setQuestions = function (step) {
            $scope.is_loading_soap_widget = true;
            $scope.current_step = step;

            $scope.soap_item_list = getQuestionsByStep(step);
            $timeout(function () {
                $scope.is_loading_soap_widget = false;
            }, 600);
        };

        $scope.saveAnswer = function (question) {
            if (question) {
                var answer = {
                    AnswerText: question.Answer,
                    Question_id: question._id,
                    Patient_id: $scope.patient._id
                };

                //Save answer
                Restangular.one("answers").put(answer);

                generateJournal();
            }
        };

        $scope.copyPast = function () {
            return $scope.journal_text;
        };

        $scope.copyPastEffect = function () {
            $scope.is_copying_jounal = true;
            $timeout(function () {
                $scope.is_copying_jounal = false;
            }, 300);
        };

        $scope.backStep = function () {
            var back_step = _.find($scope.steps, {SortOrder: $scope.current_step.SortOrder - 1});

            if (back_step) {
                $scope.setQuestions(back_step);
            }
        };

        $scope.nextStep = function () {
          console.log("next step");
            var next_step = _.find($scope.steps, {SortOrder: $scope.current_step.SortOrder + 1});

            if (next_step) {
                $scope.setQuestions(next_step);
            }
        };

        $scope.findOptionByKey = function (answer, option) {
            var _option = _.find(option, function (o) {
                return o.Key === answer;
            });

            return _option !== undefined ? _option.Value : '';
        };

        $scope.findSelectOptionByKey = function (answer, option) {
            var answer_array = [];
            _.forEach(option, function (option) {
                if(_.contains(answer, option.Key)) {
                    answer_array.push(option.Value);
                }
            });

            return answer_array.length >= 0 ? answer_array.join("|") : '';
        };

        $scope.completePatient = function () {
            $scope.patient.Completed = true;

            Restangular.one('patients', $scope.patient._id).post(['Completed']).then(function () {
                $location.path('/');
            });
        };

        init();
    });
