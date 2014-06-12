'use strict';

angular.module('waitingRoomApp')
    .controller('PatientCtrl', function ($scope, $rootScope) {
        console.log("PatientCtrl init");
        $rootScope.$broadcast("event:load_stop");

        $scope.soap_item_list = [
            {
                question: "Alder",
                answer: "47",
                type: "single-text",
                options: []
            },
            {
                question: "Køn",
                answer: "Kvinde",
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
                type: "select-list",
                options: [
                    {
                        key: "0",
                        value: "0"
                    },
                    {
                        key: "1",
                        value: "1"
                    },
                    {
                        key: "2",
                        value: "2"
                    },
                    {
                        key: "3",
                        value: "3"
                    },
                    {
                        key: "4",
                        value: "4"
                    },
                    {
                        key: "5",
                        value: "5"
                    }
                ]
            },
            {
                question: "Har du målt din feber i dag?",
                answer: "Ja",
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
                options: []
            }
        ];

        $scope.$watch("soap_item_list", function () {

            console.log($scope.soap_item_list);
        }, true);
    });
