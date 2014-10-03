'use strict';

angular.module('waitingRoomApp')
    .controller('ClinicsCtrl', function ($scope, $rootScope, $modal, clinics) {
        $scope.clinics = clinics;


        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-clinic-modal.html',
                controller: function ($scope, $modalInstance, clinics) {
                    console.log($scope);

                    $scope.save = function (form, clinic) {
                        $scope.is_submitted = true;

                        if(form.$valid) {
                            $scope.is_loading = true;

                            Restangular.all("clinics").post(clinic).then(function (clinic) {
                                $scope.is_loading = false;
                                $scope.is_submitted = false;
                                clinics.push(clinic);
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
                    clinics: function () {
                        return $scope.clinics;
                    }
                }
            });
        }
    });
