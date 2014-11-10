'use strict';

angular.module('waitingRoomApp')
   .controller('MainCtrl', function ($scope, $rootScope, $timeout, Dictionary, Restangular, Auth) {
        $scope.baseSchemes = Restangular.all("schemes");


        $rootScope.d = Dictionary.init('da');

        $rootScope.$watch('currentUser', function () {
            if(Auth.roleHasAccess(['Tablet'])) {
                $rootScope.ui_type = 'tablet';

                //Initiate tablet user
                $rootScope.resetTabletUser();

                $scope.tablet_is_loading = true;
                Restangular.one("tablets").get().then(function(tablet_response) {
                    $scope.tablet_is_loading = false;
                    $rootScope.t = tablet_response;
                });
            }

            if (Auth.roleHasAccess(['User', 'Editor', 'Admin'])) {
                $rootScope.ui_type = 'dashboard';
            }
        });

        $scope.showContentTree = function () {
            $scope.show_content_tree = !$scope.show_content_tree;
        };

        $scope.hideContentTree = function () {
            $scope.show_content_tree = false;
        };

        $rootScope.resetTabletUser = function (){
            $rootScope.tablet_user = {
                doctor: undefined,
                questions: undefined,
                scheme: undefined,
                patient: undefined,
                time: undefined,
                id: undefined
            };
        }

        $rootScope.$watch('tablet_user', function (new_val) {
            console.log(new_val);
        }, true);
   });
