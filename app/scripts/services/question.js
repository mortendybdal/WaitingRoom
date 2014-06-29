'use strict';

angular.module('waitingRoomApp')
    .factory('Question', function () {
        return  [
            {
                question: "Alder?",
                answer: "47",
                journalText: "{{}} år",
                type: "single-text",
                options: []
            },
            {
                question: "Køn?",
                answer: "Kvinde",
                journalText: "Jeg heeder {{}}",
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
            },
            {
                question: "Lægens egen kommentar?",
                answer: "Ja",
                journalText: "{{}}",
                type: "multi-text",
                options: []
            }
        ];
    });
