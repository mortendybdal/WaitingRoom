'use strict';

angular.module('waitingRoomApp')
    .controller('QuestionBuilderCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, Restangular, question) {
        $scope.options = [
            { Label: 'Single Text', Value: "single-text" },
            { Label: 'Multi Text', Value: "multi-text" },
            { Label: 'Radio List', Value: "radio-list" },
            { Label: 'Select List', Value: "select-list" }
        ];
        $scope.journal_prefix = "......";
        $scope.journal_suffix = "......";


        if (question) {
            $scope.question = question;
            $scope.question.Type = _.find($scope.options, $scope.question.Type);

            if($scope.question.ParentQuestion && $scope.question.ParentQuestion.Options && $scope.question.CorrectAnswer) {
                $scope.question.CorrectAnswer = _.find($scope.question.ParentQuestion.Options, $scope.question.CorrectAnswer);
            }

            setJournalText($scope.question.JournalText);
        }

        function getJournalText() {
            var prefix, suffix;

            if($scope.journal_prefix === "......" || $scope.journal_prefix === "&#8203") {
                prefix = "";
            }else {
                prefix = $scope.journal_prefix;
            }

            if($scope.journal_suffix === "......" || $scope.journal_suffix === "&#8203") {
                suffix = "";
            }else {
                suffix = $scope.journal_suffix;
            }

            var journal = prefix + " {{}} " + suffix;

            return journal.replace(/&nbsp;/g,'');
        }

        function setJournalText(journaltext) {
            if(journaltext) {
                var journal_array = journaltext.split("{{}}");

                console.log(journal_array[0]);
                if(!journal_array[0]) {
                    $scope.journal_prefix = "......";
                }else {
                    $scope.journal_prefix = journal_array[0];
                }

                console.log(journal_array[1]);
                if(!journal_array[1]) {
                    $scope.journal_suffix = "......";
                }else {
                    $scope.journal_suffix = journal_array[1];
                }
            }
        }

        $scope.save = function (form) {
            $scope.submitted = true;

            console.log(form);

            if (form.$valid) {

                $scope.updating_question = true;
                _.remove($scope.question.Options, function(option) {
                    return option.Value === "" && option.Key === "";
                });

                $scope.question.JournalText = getJournalText()

                $scope.question.save().then(function () {
                    $scope.updating_question = false;

                    $rootScope.$broadcast("event:update_content_tree");
                });
            }
        };

        $scope.openModal = function (type, title, parent_id) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.title = title;
                    $scope.parent_id = parent_id;
                }
            });
        };

        $scope.addOption = function () {
            var option = {
                Key: "",
                Value: ""
            };

            $scope.question.Options.push(option);
        };

        $scope.prefixFocus = function () {
            if($scope.journal_prefix === "......") {
                $scope.journal_prefix = "&#8203";
            }
        };

        $scope.prefixBlur = function () {
            if($scope.journal_prefix === "&#8203" || $scope.journal_prefix === "") {
                $scope.journal_prefix = "......";
            }
        };

        $scope.suffixFocus = function () {
            if($scope.journal_suffix === "......") {
                $scope.journal_suffix = "&#8203";
            }
        };

        $scope.suffixBlur = function () {
            if($scope.journal_suffix === "&#8203" || $scope.journal_suffix === "") {
                $scope.journal_suffix = "......";
            }
        };
    });
