'use strict';

angular.module('waitingRoomApp')
    .factory('AnswerService', function ($http) {
        var AnswerService = {

            data: {},

            saveAnswer: function(answer){
                return $http(
                    {
                        url: '/api/answers/save',
                        method: "post",
                        data: {
                            answer: answer
                        },
                        cache: false
                    }
                ).success(
                    function (data) {
                        AnswerService.data = data;
                    }
                ).error(
                    function () {
                        throw new Error("AnswerService failed");
                    }
                );
            }
        };

        return AnswerService;
    });