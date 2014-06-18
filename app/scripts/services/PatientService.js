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
            createPatient: function (patient) {
                return $http(
                    {
                        url: '/api/patients/create',
                        method: "Post",
                        cache: false,
                        data: patient
                    }
                ).success(function (data) {
                        console.log(data);
                    })
                    .error(function () {
                        console.log("ERROR");
                    });
            }
        };

        return PatientService;
    });