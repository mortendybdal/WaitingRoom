'use strict';

angular.module('waitingRoomApp')
    .factory('SchemeService', function ($http) {
        var SchemeService = {

            data: {},

            getSchemeByPatientId: function (patientid) {
                return $http(
                    {
                        url: '/api/schemes/getschemebypatientid',
                        method: "Post",
                        cache: false,
                        data: {patient_id: patientid}
                    }
                ).success(
                    function (data) {
                        SchemeService.data = data;
                    })
                    .error(function () {
                        console.log("ERROR");
                    });
            }
        };

        return SchemeService;
    });