'use strict';

angular.module('waitingRoomApp')
    .controller('TabletQuestionCtrl', function ($scope, $rootScope, $routeParams, $location, $timeout) {


        function findNextInOrder () {

            var next_question = _.find($rootScope.response.questions, function (q) {
                if (q.SortOrder > $scope.question.SortOrder) {
                    if(q.ParentQuestion) {
                        if (q.CorrectAnswer) {
                            var parent_question = _.find($rootScope.response.questions, {_id: q.ParentQuestion});

                            if(q.CorrectAnswer.Key === parent_question.Answer) {
                                return true;
                            }
                        }
                    }else {
                        return true;
                    }
                }
            });

            if(!next_question) {
                $location.path('/tablet/thankyou');

            } else {
                $location.path('tablet/question/' + next_question._id + '/next');
            }
        }

        function findPreviousInOrder () {
            var questions_clone =  _.clone($rootScope.response.questions).reverse();

            var previous_question = _.find(questions_clone, function (q) {
                if (q.SortOrder < $scope.question.SortOrder) {
                    if(q.ParentQuestion) {
                        if (q.CorrectAnswer) {
                            var parent_question = _.find($rootScope.response.questions, {_id: q.ParentQuestion});

                            if(q.CorrectAnswer.Key === parent_question.Answer) {
                                return true;
                            }
                        }
                    }else {
                        return true;
                    }
                }
            });

            if(!previous_question) {
                $location.path('tablet/schemes/previous');
            } else {
                $location.path('tablet/question/' + previous_question._id + '/previous');
            }
        }

        function setCurrentQuestion(questions) {
            $scope.question = _.find(questions, {_id: $routeParams.id});

            if(!$scope.question) {
                $location.path('tablet');
            }
        }

        function setSlideDirection() {
            if($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }
        }

        $scope.nextSlide = function () {
            $scope.page_class = 'page-slide-in-left revert';
            findNextInOrder();
        };


        $scope.backSlide = function () {
            $scope.page_class = 'page-slide-in-right revert';
            findPreviousInOrder();
        };

        $scope.onKeyPressed = function ($event) {
            if($event.keyCode === 13) {
                findNextInOrder();
            }
        }

        $scope.addToSelectList = function (answer) {
            var answer_array = $scope.question.Answer.split("|");

            if(_.contains(answer_array, answer)) {
                _.remove(answer_array, function(a) { return a === answer; });
            } else {
                answer_array.push(answer);
            }

            $scope.question.Answer = _.compact(answer_array).join("|");

        }

        $scope.existInSelectList = function (answer) {

            if ($scope.question.Answer === undefined) {
                $scope.question.Answer = ""
            };

            return _.contains($scope.question.Answer.split("|"), answer);
        }

        function init() {
            $rootScope.tablet_ui = true;

            if (!$rootScope.response.doctor) {
                $location.path('tablet')
            }

            if($routeParams.id) {
                if ($rootScope.response.questions) {
                    setSlideDirection($rootScope.response.questions);

                    setCurrentQuestion($rootScope.response.questions);

                    $timeout(function () {
                        $scope.set_focus = true;
                    }, 800);
                } else {
                    $location.path('tablet');
                }
            }
        }

        init();
    });
