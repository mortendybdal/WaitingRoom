'use strict';

angular.module('waitingRoomApp')
    .factory('QuestionService', function ($http) {
        var QuestionService = {

            data: {},

            getQuestionsForScheme: function(scheme_id, patient_id){
                return $http(
                    {
                        url: '/api/questions/all',
                        method: "POST",
                        data: {
                            patient_id: patient_id,
                            scheme_id: scheme_id
                        },
                        cache: false
                    }
                ).success(
                    function (data) {
                        QuestionService.data = data;
                    }
                ).error(
                    function () {
                        throw new Error("PatientService failed");
                    }
                );
            }
        };

        return QuestionService;
    });