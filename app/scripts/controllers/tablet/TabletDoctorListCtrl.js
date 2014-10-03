'use strict';

angular.module('waitingRoomApp')
    .controller('TabletDoctorListCtrl', function ($scope, $rootScope, $location, Auth) {
        //Authenticate - Only editors and admins are allowed to build new schemes
        if(!Auth.roleHasAccess(['Tablet'])) {
            $location.path('/');
            return;
        }

        $rootScope.tablet_ui = true;

        $scope.page_class = 'page-slide-up';

        $scope.selectDoctor = function (doctor) {
            $rootScope.response.doctor = doctor;
            $location.path('tablet/schemes')
        }
    });
