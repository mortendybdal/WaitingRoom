'use strict';

angular.module('waitingRoomApp')
    .controller('SchemeBuilderCtrl', function ($scope, $rootScope, $modal, scheme) {

        if (scheme) {
            $scope.scheme = scheme;
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
