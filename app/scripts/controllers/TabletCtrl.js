'use strict';

angular.module('waitingRoomApp')
    .controller('TabletCtrl', function ($scope, $rootScope, Question, PatientService) {
        $rootScope.hide_navigation_menu = true;
        $scope.index = -1;
        $scope.direction = "left";
        $scope.questions = Question;
        $scope.scheme_type = "none";

        $rootScope.$broadcast("event:load_stop");

        $scope.nextSlide = function () {
            $scope.index++;
            $scope.direction = "left";
        }

        $scope.backSlide = function () {
            $scope.index--;
            $scope.direction = "right";
        }

        $scope.finishQuestionary = function () {
            console.log("Finish");

            PatientService.createPatient({scheme: $scope.scheme_type}).then(function () {
                console.log("Patient created - client");
                $scope.nextSlide();
            });
        }

        $scope.setSchemeType = function (type) {
            $scope.scheme_type = type;

            $scope.nextSlide();
        }
    });
