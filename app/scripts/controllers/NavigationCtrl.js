'use strict';

angular.module('waitingRoomApp')
    .controller('NavigationCtrl', function ($scope, $rootScope, $location, $modal, Auth, Restangular) {
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
            $scope.show_content_tree = !$scope.show_content_tree
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
            console.log("update content tree");
            $scope.baseSchemes.getList().then(function (schemes) {
                $scope.schemes = schemes;
                console.log("content tree up to date");
            });
        });

        $scope.$on('$routeChangeStart', function () {
            $scope.show_content_tree = false;
        });

        $scope.createScheme = function (form) {
            $scope.submitted = true;

            if (form.$valid) {

                var scheme = {};
                scheme.Title = form.title.$modelValue;

                $scope.baseSchemes.post(scheme).then(function (scheme) {

                    $rootScope.$broadcast("event:update_content_tree");
                    $scope.hideModal();
                    $location.path('scheme-builder/' + scheme._id);
                }, function () {
                    console.log("Error occured when creating new scheme");
                });

            }
        };

        var create_scheme_modal = $modal({
            scope: $scope,
            template: 'partials/modals/create-scheme-modal.html',
            show: false
        });

        $scope.showModal = function () {
            create_scheme_modal.$promise.then(create_scheme_modal.show);
        };

        $scope.hideModal = function () {
            create_scheme_modal.$promise.then(create_scheme_modal.hide);
        };
    });
