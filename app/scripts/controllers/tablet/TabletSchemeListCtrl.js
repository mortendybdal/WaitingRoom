'use strict';

angular.module('waitingRoomApp')
    .controller('TabletSchemeListCtrl', function ($scope, $rootScope, $location, $routeParams) {
        console.log("TabletSchemeListCtrl INIT");
        $rootScope.tablet_ui = true;

        function rearrageQuestions (scheme) {
            var questions = _.sortBy(_.find(scheme.steps, {SortOrder: 0}).questions, 'SortOrder'),
                rearranged_questions = [],
                index = 0;

            _.forEach(questions, function (question) {
                question.SortOrder = index;
                rearranged_questions.push(question);
                index++

                _.forEach(_.sortBy(question.questions, 'SortOrder'), function (question) {
                    question.SortOrder = index;
                    rearranged_questions.push(question);
                    index++
                });
            });

            return rearranged_questions;
        }

        $scope.selectScheme = function (scheme) {
            $scope.page_class = 'page-slide-in-left revert';
            var cloned_scheme = _.cloneDeep(scheme);
            $rootScope.response.questions = rearrageQuestions(cloned_scheme);
            $rootScope.response.scheme = scheme._id;

            var first_question = _.find($rootScope.response.questions, {SortOrder: 0});


            $location.path('tablet/question/' + first_question._id + '/next')
        }

        function init() {
            if($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }
        }

        init();
    });
