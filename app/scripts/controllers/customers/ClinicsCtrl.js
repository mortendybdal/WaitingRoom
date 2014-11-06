'use strict';

angular.module('waitingRoomApp')
    .controller('ClinicsCtrl', function ($scope, $rootScope, $modal, clinics, users, Restangular) {
        $rootScope.current_url = 'member';
        $scope.roles = ["Admin"];
        $scope.clinics = clinics;
        $scope.admins = _.where(users, {role: 'Admin'});
        console.log($scope.admins);
        $scope.current_selected_admin = null;


        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-clinic-modal.html',
                controller: function ($scope, $location, $modalInstance, clinics) {

                    $scope.save = function (form, clinic) {
                        $scope.is_submitted = true;

                        if(form.$valid) {
                            $scope.is_loading = true;

                            Restangular.all("clinics").post(clinic).then(function (clinic) {
                                $scope.is_loading = false;
                                $scope.is_submitted = false;
                                clinic.NumberOfUsers = 0;
                                clinics.push(clinic);
                                $modalInstance.close();
                                $location.path('customer/clinic/' + clinic._id);
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
                    clinics: function () {
                        return $scope.clinics;
                    }
                }
            });
        }

        $scope.openCreateAdminModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-admin-modal.html',
                controller: function ($scope, $modalInstance, admins, roles) {
                    $scope.roles = roles;


                    $scope.save = function (form, admin) {
                        $scope.is_submitted = true;

                        if(form.$valid) {
                            $scope.is_loading = true;

                            admin.role = 'Admin'

                            Restangular.all("users").post(admin).then(function (admin) {
                                $scope.is_loading = false;
                                $scope.is_submitted = false;
                                admins.push(admin);
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
                    admins: function () {
                        return $scope.admins;
                    },
                    roles: function () {
                        return $scope.roles;
                    }
                }
            });
        }

        $scope.save = function (form, admin) {
            $scope.submitted = true;

            if (form.$valid) {
                $scope.updating_user = true;

                admin.put().then(function () {
                    $scope.updating_user = false;
                });
            }
        };

        $scope.openDeleteModal = function (admin) {
            $modal.open({
                templateUrl: 'partials/modals/delete-doctor-modal.html',
                controller: function ($scope, $modalInstance, admins) {
                    $scope.user = admin;

                    $scope.delete = function (admin) {
                        $scope.is_loading = true;
                        Restangular.one("Users", admin._id).remove().then(function () {
                            $scope.is_loading = false;
                            _.remove(admins, function(a) { return a._id === admin._id; });
                            $modalInstance.close();
                        });
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    }
                },
                resolve: {
                    admins: function () {
                        return $scope.admins;
                    }
                }
            });
        };

        $scope.collapsUser = function (user) {
            if($scope.current_selected_admin !== user) {
                $scope.current_selected_admin = user;
            }else {
                $scope.current_selected_admin = null;
            }
        };
    });
