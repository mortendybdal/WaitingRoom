'use strict';

angular.module('waitingRoomApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
