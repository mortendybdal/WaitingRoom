'use strict';

angular.module('waitingRoomApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $timeout, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        $rootScope.$broadcast("event:update_content_tree");

                        // Logged in, redirect to home

                        if ($rootScope.currentUser.role !== 'Tablet') {
                            $location.path('/');
                        } else {
                            $location.path('/tablet');
                        }

                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors.other = $rootScope.d[err.message];
                        console.log(err.message);
                    });
            }
        };

        $scope.onKeyPressed = function (form, event) {
            if (event.keyCode === 13) {
                $scope.login(form);
            }
        };
    });