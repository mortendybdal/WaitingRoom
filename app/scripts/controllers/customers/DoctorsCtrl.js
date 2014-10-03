'use strict';

angular.module('waitingRoomApp')
  .controller('DoctorsCtrl', function ($scope, $rootScope, $routeParams, $modal, clinic, users) {
        $scope.roles = ["Admin", "Editor", "User", "Tablet"];
        $scope.clinic = clinic;
        $scope.users = users;


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
                controller: function ($scope, $modalInstance, users) {
                    $scope.user = user;

                    $scope.delete = function (user) {
                        $scope.is_loading = true;
                        Restangular.one("Users", user._id).remove().then(function () {
                            $scope.is_loading = false;
                            _.remove(users, function(u) { return u._id === user._id; });
                            $modalInstance.close();
                        });
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    }
                },
                resolve: {
                    users: function () {
                        return $scope.users;
                    }
                }
            });
        };

        $scope.openDeleteClinicModal = function (clinic) {
            $modal.open({
                templateUrl: 'partials/modals/delete-clinic-modal.html',
                controller: function ($scope, $modalInstance, $location, clinic, users) {
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
  });
