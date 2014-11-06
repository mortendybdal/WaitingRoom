'use strict';

angular.module('waitingRoomApp')
    .directive('spinner', function () {
        return {
            restrict: 'E',
            template: "<div ng-show='active'><div class='spinner'><div class='dot1'></div><div class='dot2'</div></div></div>",
            scope: {
                active: "="
            },
            link: function (scope) {
                scope.$watch('active', function (value) {
                    //console.log("Is active", value);
                });
            }
        };
    });