'use strict';

angular.module('waitingRoomApp')
  .controller('DoctorsCtrl', function ($scope, $rootScope, $routeParams, $modal, Restangular) {
        $scope.roles = [
            {Label: "Admin", Value: 0},
            {Label: "Editor", Value: 1},
            {Label: "User", Value: 2}
        ];

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-doctor-modal.html',
                controller: function ($scope, $modalInstance, users, roles) {
                    $scope.roles = roles;


                    $scope.save = function (form, user) {
                        $scope.is_submitted = true;

                        console.log(form);
                        if(form.$valid) {
                            $scope.is_loading = true;

                            user.clinic = $routeParams.id;

                            Restangular.all("users").post(user).then(function (user) {
                                $scope.is_loading = false;
                                $scope.is_submitted = false;
                                users.push(user);
                                $modalInstance.close();
                            }, function () {
                                console.log("Error occured when creating new customer");
                            });

                        }
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    }
                },
                resolve: {
                    users: function () {
                        return $scope.users;
                    },
                    roles: function () {
                        return $scope.roles;
                    }
                }
            });
        }

        function init() {
            if ($routeParams.id) {

                Restangular.one('clinics', $routeParams.id).get().then(function (clinic) {
                    $scope.clinic = clinic;

                    console.log($scope.clinic);

                    $rootScope.$broadcast("event:load_stop");
                });

                Restangular.one('users', $routeParams.id).get().then(function (users) {
                    $scope.users = users;

                    console.log($scope.users);
                });
            }
        }

        init();
  });
