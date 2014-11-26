'use strict';

angular.module('waitingRoomApp')
    .directive('bouncer', function () {
        return {
            restrict: 'E',
            template: "<div class='bouncer-container' ng-show='active'><div class='bouncer'><div class='double-bounce1'></div><div class='double-bounce2'></div></div></div>",
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