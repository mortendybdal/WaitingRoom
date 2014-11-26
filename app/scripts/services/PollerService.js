'use strict';
/* jshint -W030 */

angular.module('waitingRoomApp')
    .factory('PollerService', function($http, $timeout) {
    var _this = this;
    _this.patients = [];

    return {
        init: function () {
          var poller = function() {

            $http.get('/api/patients', {
              ignoreLoadingBar: true
            }).then(function (patients) {
              _this.patients = patients.data;

              $timeout(poller, 2000);
            });
          };
          poller();
        },
        patients: function () {
          return _this.patients;
        }
    };
});
