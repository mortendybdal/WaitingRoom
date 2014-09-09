'use strict';

angular.module('waitingRoomApp')
  .controller('DoctorsCtrl', function ($scope, $rootScope, $routeParams, $modal, Restangular) {
        $scope.roles = ["Admin", "Editor", "User"];

        $scope.current_selected_doctor = null;

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

        $scope.save = function (form, user) {
            $scope.submitted = true;

            if (form.$valid) {
                $scope.updating_user = true;

                console.log(user);

                user.put().then(function () {
                    $scope.updating_user = false;
                });
            }
        };

        $scope.openDeleteModal = function (user) {
            $modal.open({
                templateUrl: 'partials/modals/delete-doctor-modal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.user = user;

                    $scope.delete = function (item_id) {
                        $scope.is_loading = true;
                        Restangular.one("Users", item_id).remove().then(function () {
                            $scope.is_loading = false;
                            $modalInstance.close();
                        });
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $scope.openDeleteClinicModal = function (clinic) {
            $modal.open({
                templateUrl: 'partials/modals/delete-clinic-modal.html',
                controller: function ($scope, $modalInstance, $location) {
                    $scope.clinic = clinic;

                    $scope.delete = function (item_id) {
                        $scope.is_loading = true;
                        Restangular.one("Clinics", item_id).remove().then(function () {
                            $scope.is_loading = false;
                            $modalInstance.close();
                            $location.path('/customers');
                        });
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    }
                }
            });
        };

        $scope.collapsUser = function (user) {
            if($scope.current_selected_doctor !== user) {
                $scope.current_selected_doctor = user;
            }else {
                $scope.current_selected_doctor = null;
            }
        };

        function init() {
            if ($routeParams.id) {

                Restangular.one('clinics', $routeParams.id).get().then(function (clinic) {
                    $scope.clinic = clinic;

                    console.log($scope.clinic);

                    $rootScope.$broadcast("event:load_stop");
                });

                Restangular.one('clinics', $routeParams.id).getList('users').then(function (users) {
                    $scope.users = users;

                    console.log($scope.users);
                });
            }
        }

        init();
  });
