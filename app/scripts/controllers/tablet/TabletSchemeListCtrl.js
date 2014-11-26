'use strict';

angular.module('waitingRoomApp')
    .controller('TabletSchemeListCtrl', function ($scope, $rootScope, $location, $routeParams, Restangular) {
        $scope.basePatients = Restangular.all("patients");

        function init() {
            if (!$rootScope.tablet_user) {
                //Reset tablet user and redirect to frontpage
                $rootScope.resetTabletUser();
                $location.path('tablet');
            }

            if ($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }

            if ($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }
        }

        function rearrageQuestions(scheme) {
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

        function savePatient() {
            $rootScope.tablet_user
            /*var patient = {
                Doctor: $rootScope.tablet_user.doctor._id,
                Status: "Started",
                TimeOfAppointment: new Date($rootScope.tablet_user.time),
                Schemes: []
            };

            patient.Schemes.push($rootScope.tablet_user.scheme);

            if($rootScope.tablet_user.patient !== undefined) {
                patient._id = $rootScope.tablet_user.patient._id;
            }

            $scope.basePatients.post(patient).then(function (patient) {
                $rootScope.tablet_user.patient = patient;
                //Redirect to firt question

            }, function () {
                //Reset tablet user and redirect to frontpage
                $rootScope.resetTabletUser();
                $location.path('tablet');
            });
            */
        }

        $scope.selectScheme = function (scheme) {
            $scope.page_class = 'page-slide-in-left revert';
            var cloned_scheme = _.cloneDeep(scheme);
            $rootScope.tablet_questions = rearrageQuestions(cloned_scheme);

            //Temp - untill support of multi schemes
            $rootScope.tablet_user.Schemes = [];
            $rootScope.tablet_user.Schemes.push(scheme._id);
            $rootScope.tablet_user.Status = 'Started';
            $rootScope.tablet_user.save().then(
                function () {
                    //Redirect to first question of scheme
                    var first_question = _.find($rootScope.tablet_questions, {SortOrder: 0});
                    $location.path('tablet/question/' + first_question._id + '/next')
                },
                function () {
                    //Reset tablet user and redirect to frontpage
                    $rootScope.resetTabletUser();
                    $location.path('tablet');
                }
            );



        }

        $scope.backSlide = function () {
            $scope.page_class = 'page-slide-in-right revert';
            $location.path('tablet/appointment-time/previous');
        };

        init();
    });
