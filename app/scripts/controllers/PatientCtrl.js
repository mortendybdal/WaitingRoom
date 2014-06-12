'use strict';

angular.module('waitingRoomApp')
    .controller('PatientCtrl', function ($scope, $rootScope) {
        console.log("PatientCtrl init");
        $rootScope.$broadcast("event:load_stop");

        $scope.soap_item_list = [
            {
                question: "Alder",
                answer: "47",
                journalText: "{{}} år",
                type: "single-text",
                options: []
            },
            {
                question: "Køn",
                answer: "Kvinde",
                journalText: "{{}}",
                type: "radio-list",
                options: [
                    {
                        key: "0",
                        value: "Kvinde"
                    },
                    {
                        key: "1",
                        value: "Mand"
                    }
                ]
            },
            {
                question: "Har du haft feber?",
                answer: "Ja",
                journalText: "Feber: {{}}",
                type: "radio-list",
                options: [
                    {
                        key: "0",
                        value: "Ja"
                    },
                    {
                        key: "1",
                        value: "Nej"
                    }
                ]
            },
            {
                question: "Hvor længe har du haft feber?",
                answer: "3 dage",
                journalText: "{{}}",
                type: "select-list",
                options: [
                    {
                        key: "1 dage",
                        value: "1 dage"
                    },
                    {
                        key: "2 dage",
                        value: "2 dage"
                    },
                    {
                        key: "3 dage",
                        value: "3 dage"
                    },
                    {
                        key: "4 dage",
                        value: "4 dage"
                    },
                    {
                        key: "5 dage",
                        value: "5 dage"
                    }
                ]
            },
            {
                question: "Har du målt din feber i dag?",
                answer: "Ja",
                journalText: "Målt feber: {{}}",
                type: "radio-list",
                options: [
                    {
                        key: "0",
                        value: "Ja"
                    },
                    {
                        key: "1",
                        value: "Nej"
                    }
                ]
            },
            {
                question: "Har du andre kommentar?",
                answer: "Ja jeg syntes at have mavepine hver anden dag",
                type: "multi-text",
                journalText: "Patient tilføjer: {{}}",
                options: []
            }
        ];

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
            console.log($scope.journal_text);
            return $scope.journal_text
        };
    });
