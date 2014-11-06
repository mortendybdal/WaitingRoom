'use strict';

angular.module('waitingRoomApp')
    .controller('StepBuilderCtrl', function ($scope, $rootScope, $routeParams, $modal, step) {
        $rootScope.current_url = 'builder';

        if (step) {
            $scope.step = step;
        }

        $scope.save = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                $scope.updating_step = true;

                $scope.step.save().then(function () {
                    $scope.updating_step = false;

                    $rootScope.$broadcast("event:update_content_tree");
                });
            }
        };

        $scope.openModal = function (type, title, parent_id) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.title = title;
                    $scope.parent_id = parent_id;
                }
            });
        };
    });
