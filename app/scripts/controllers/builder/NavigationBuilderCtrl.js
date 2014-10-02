'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationBuilderCtrl', function ($scope, $rootScope, $modal, Restangular, Auth) {
        //Authenticate - Only editors and admins are allowed to build new schemes
        /*if (!Auth.roleHasAccess(['Editor', 'Admin'])) {
            console.log("Is returned", $rootScope.currentUser)
            return;
        }
        */

        $scope.baseSchemes = Restangular.all("schemes");
        $scope.expanded_items = [];

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
            $scope.hideContentTree();
        });

        $scope.content_tree = {
            accept: function (sourceNodeScope, destNodesScope) {
                //Ensures that it is only possible to drop item on same level as it came from and under same parent
                return sourceNodeScope.depth() === destNodesScope.depth() + 1 && destNodesScope.isParent(sourceNodeScope);
            },
            dropped: function (event) {

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

        $scope.openModal = function (type, title, parent_id) {
            console.log(name);
            $modal.open({
                templateUrl: 'partials/modals/create-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.title = title;
                    $scope.parent_id = parent_id;
                }
            });
        };


        $scope.openDeleteModal = function (type, title, name, item_id) {

            $modal.open({
                templateUrl: 'partials/modals/delete-modal.html',
                controller: function ($scope, $modalInstance, ModalService) {
                    $scope.ModalService = ModalService.init($modalInstance);
                    $scope.type = type;
                    $scope.title = title;
                    $scope.name = name;
                    $scope.item_id = item_id;
                }
            });
        };

        function init() {
            $scope.baseSchemes.getList().then(function (schemes) {
                $scope.schemes = schemes;
            });
        }

        $rootScope.$watch('currentUser', function (new_val) {
            if(Auth.roleHasAccess(['Editor', 'Admin'])) {
                init();
            }
        });
    });
