'use strict';

angular.module('waitingRoomApp')
    .directive('patientStatus', function () {
        return {
            restrict: 'E',
            templateUrl: "/partials/directives/patient-status.html",
            scope: {
                status: "="
            }
        };
    });
