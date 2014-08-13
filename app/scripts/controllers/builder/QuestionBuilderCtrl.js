'use strict';

angular.module('waitingRoomApp')
    .controller('QuestionBuilderCtrl', function ($scope, $rootScope, $routeParams, $modal, $location, Restangular) {

        if ($routeParams.id) {
            Restangular.one('questions', $routeParams.id).get().then(function (question) {
                $scope.question = question;

                $rootScope.$broadcast("event:load_stop");
            });
        }

        $scope.options = [
            { label: 'Single Text', value: "single-text" },
            { label: 'Multi Text', value: "multi-text" },
            { label: 'Radio List', value: "radio-list" },
            { label: 'Select List', value: "select-list" }
        ];


        $scope.save = function (form) {
            $scope.submitted = true;


            if (form.$valid) {
                $scope.updating_question = true;

                $scope.question.save().then(function () {
                    $scope.updating_question = false;

                    $rootScope.$broadcast("event:update_content_tree");
                });
            }
        };

        $scope.openModal = function (type, parent_id) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/modals/create-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.parent_id = parent_id;
                }
            });
        };
    });
