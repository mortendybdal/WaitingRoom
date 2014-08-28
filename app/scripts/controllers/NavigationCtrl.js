'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationCtrl', function ($scope, $rootScope, $location, $modal, $timeout, Auth, Restangular) {
        $scope.baseSchemes = Restangular.all("schemes");
        $scope.expanded_items = [];

        $scope.baseSchemes.getList().then(function (schemes) {
            $scope.schemes = schemes;
        });

        $scope.logout = function () {
            console.log("Logout?");

            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };

        $scope.showContentTree = function () {
            $scope.show_content_tree = !$scope.show_content_tree;
        };

        $scope.hideContentTree = function () {
            console.log("Hide");
            $scope.show_content_tree = false;
        };

        $scope.expandContentTree = function (item) {
            if (_.contains($scope.expanded_items, item._id)) {
                _.remove($scope.expanded_items, function (id) {
                    return id === item._id;
                });
            } else {
                $scope.expanded_items.push(item._id);
            }
        };

        $scope.contentItemIsOpen = function (item) {
            return _.contains($scope.expanded_items, item._id);
        };

        $rootScope.$on("event:update_content_tree", function () {
            $scope.baseSchemes.getList().then(function (schemes) {
                $scope.schemes = schemes;
                console.log("Updating content....");
            });
        });

        $scope.$on('$routeChangeStart', function () {
            $scope.show_content_tree = false;
        });

        $scope.content_tree = {
            accept: function(sourceNodeScope, destNodesScope) {
                //Ensures that it is only possible to drop item on same level as it came from and under same parent
                return sourceNodeScope.depth() === destNodesScope.depth() + 1 && destNodesScope.isParent(sourceNodeScope);
            },
            dropped: function(event) {

                var destNodes = event.dest.nodesScope,
                    content_type = destNodes.$element.attr('data-type'),
                    reorderd_collection = destNodes.$modelValue;

                _.forEach(reorderd_collection, function (content_item, index) {
                    Restangular.one(content_type, content_item._id).get().then(function (item) {
                        item.SortOrder = index;
                        item.save();
                    });

                });
            }
        };

        $scope.openModal = function (type, parent_id) {
            console.log(name);
            $modal.open({
                templateUrl: 'partials/modals/create-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.parent_id = parent_id;
                }
            });
        };


        $scope.openDeleteModal = function (type, name, item_id) {

            $modal.open({
                templateUrl: 'partials/modals/delete-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.name = name;
                    $scope.item_id = item_id;
                }
            });
        };
    });
