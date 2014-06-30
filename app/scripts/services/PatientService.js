'use strict';

angular.module('waitingRoomApp')
    .factory('PatientService', function ($http) {
        var PatientService = {

            data: {},

            getAllPatients: function(){
                return $http(
                    {
                        url: '/api/patients/all',
                        method: "GET",
                        cache: false
                    }
                ).success(
                    function (data) {
                        PatientService.data = data;
                    }
                ).error(
                    function () {
                        throw new Error("PatientService failed");
                    }
                );
            },
            createPatientAndScheme: function (schemeid) {
                return $http(
                    {
                        url: '/api/patients/create',
                        method: "Post",
                        cache: false,
                        data: {scheme_id: schemeid}
                    }
                ).success(
                    function (data) {
                        PatientService.data = data;
                    })
                    .error(function () {
                        console.log("ERROR");
                    });
            },
            savePatientsAnswer: function (patientid, question) {
                return $http(
                    {
                        url: '/api/patients/answer',
                        method: "Post",
                        cache: false,
                        data: {patient_id: patientid, question: question}
                    }
                ).success(
                    function (data) {
                        PatientService.data = data;
                    })
                    .error(function () {
                        console.log("ERROR");
                    });
            }
        };

        return PatientService;
    });