'use strict';

angular.module('waitingRoomApp')
    .controller('TabletCtrl', function ($scope, $rootScope, $timeout, Question, PatientService, SchemeService) {
        $rootScope.hide_navigation_menu = true;
        $scope.index = -1;
        $scope.direction = "left";
        $scope.scheme_type = "none";

        SchemeService.getAllSchemes().then(function () {
            $scope.schemes = SchemeService.data;
            $timeout(function () {
                $rootScope.$broadcast("event:load_stop");
            });
        });

        $scope.nextSlide = function (question) {
            $scope.index++;
            $scope.direction = "left";

            console.log(question);

            PatientService.savePatientsAnswer($scope.patient_id, question).then(function () {

            });
        };

        $scope.backSlide = function () {
            $scope.index--;
            $scope.direction = "right";
        };

        $scope.finishQuestionary = function () {
            $scope.nextSlide();
        };

        $scope.createPatientAndSaveScheme = function (schemeid) {
            console.log(schemeid);
            $rootScope.$broadcast("event:load_start");
            $scope.hide_scheme_list = true;

            PatientService.createPatientAndScheme(schemeid).then(function () {

                $scope.questions = PatientService.data.questions;
                $scope.patient = PatientService.data.patient;

                console.log(PatientService.data);

                $timeout(function () {
                    $scope.hide_scheme_list = false;
                    $rootScope.$broadcast("event:load_stop");
                    $scope.nextSlide();
                }, 1000);
            });
        };

        //$scope.onKeyPressed = function (event) {
        //    if(event.keyCode === 13) {
        //        $scope.nextSlide();
        //    }
        //};

        $scope.getNumberOfSlidesShown = function(options) {
            if(options.length < 4) {
                return options.length;
            } else {
                return 3;
            }
        };
    });
