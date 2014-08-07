'use strict';

angular.module('waitingRoomApp')
    .controller('SchemeBuilderCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, Restangular) {
        $scope.baseSteps = Restangular.all("steps");

        if ($routeParams.id) {
            Restangular.one('schemes', $routeParams.id).get().then(function (scheme) {
                $scope.scheme = scheme;
                console.log($scope.scheme);
                $rootScope.$broadcast("event:load_stop");
            });
        }

        $scope.save = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                $scope.updating_scheme = true;

                $scope.scheme.save().then(function () {
                    $scope.updating_scheme = false;

                    $rootScope.$broadcast("event:update_content_tree");
                });
            }
        };

        var create_step_modal = $modal({
            scope: $scope,
            template: 'partials/modals/create-step-modal.html',
            show: false
        });

        $scope.showModal = function () {
            create_step_modal.$promise.then(create_step_modal.show);
        };

        $scope.hideModal = function () {
            create_step_modal.$promise.then(create_step_modal.hide);
        };

        $scope.createStep = function (form) {
            $scope.saving_step = true;
            $scope.submitted = true;

            if (form.$valid) {

                var step = {};
                step.Title = form.title.$modelValue;
                step.Scheme_id = $scope.scheme._id;

                $scope.baseSteps.post(step).then(function (step) {
                    console.log(step);
                    $scope.saving_step = false;
                    $rootScope.$broadcast("event:update_content_tree");
                    $scope.hideModal();
                    $location.path('step-builder/' + step._id);
                }, function () {
                    console.log("Error occured when creating new scheme");
                });

            }
        };
    });
