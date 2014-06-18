'use strict';

angular.module('waitingRoomApp')
    .controller('PatientCtrl', function ($scope, $rootScope, $timeout, Question) {
        console.log("PatientCtrl init");
        $scope.is_copying_jounal = false;
        $rootScope.$broadcast("event:load_stop");

        $scope.soap_item_list = Question

        $scope.$watch("soap_item_list", function () {

            var j = "";

            angular.forEach($scope.soap_item_list, function(soap, key) {

                if(soap.type === 'multi-text') {

                    j += '\n'+ soap.journalText.replace("{{}}", soap.answer) + '\n';
                }else {
                    j += soap.journalText.replace("{{}}", soap.answer) + ", ";
                }

            }, j);

            console.log($scope.soap_item_list);
            $scope.journal_text = j;
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
    });
