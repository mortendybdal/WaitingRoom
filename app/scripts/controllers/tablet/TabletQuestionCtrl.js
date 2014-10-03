'use strict';

angular.module('waitingRoomApp')
    .controller('TabletQuestionCtrl', function ($scope, $rootScope, $routeParams, $location) {
        $rootScope.tablet_ui = true;

        //Test to se if patient has selected a scheme

        function findNextInOrder () {

            var next_question = _.find($rootScope.response.questions, function (q) {
                if (q.SortOrder > $scope.question.SortOrder) {
                    if(q.ParentQuestion) {
                        if (q.CorrectAnswer) {
                            var parent_question = _.find($rootScope.response.questions, {_id: q.ParentQuestion});

                            if(q.CorrectAnswer.Value === parent_question.Answer) {
                                return true;
                            }
                        }
                    }else {
                        return true;
                    }
                }
            });

            if(!next_question) {
                console.log("GO TO FINISH PAGE");

                $location.path('/tablet/finish');

            } else {
                $location.path('tablet/next/' + next_question._id);
            }
        }

        function findPreviousInOrder () {
            var questions_clone =  _.clone($rootScope.response.questions).reverse();

            var previous_question = _.find(questions_clone, function (q) {
                if (q.SortOrder < $scope.question.SortOrder) {
                    if(q.ParentQuestion) {
                        if (q.CorrectAnswer) {
                            var parent_question = _.find($rootScope.response.questions, {_id: q.ParentQuestion});

                            if(q.CorrectAnswer.Value === parent_question.Answer) {
                                return true;
                            }
                        }
                    }else {
                        return true;
                    }
                }
            });

            if(!previous_question) {
                $location.path('tablet/schemes');
            } else {
                $location.path('tablet/previous/' + previous_question._id);
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
                $scope.page_class = 'page-slide-up';
            }

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-down';
            }
        }

        $scope.nextSlide = function () {
            findNextInOrder();
        };


        $scope.backSlide = function () {
            findPreviousInOrder();
        };

        $scope.onKeyPressed = function ($event) {
            if($event.keyCode === 13) {
                findNextInOrder();
            }
        }

        function init() {
            if($routeParams.id) {
                if ($rootScope.response.questions) {
                    setSlideDirection($rootScope.response.questions);

                    setCurrentQuestion($rootScope.response.questions);
                } else {
                    $location.path('tablet');
                }
            }
        }

        init();
    });
