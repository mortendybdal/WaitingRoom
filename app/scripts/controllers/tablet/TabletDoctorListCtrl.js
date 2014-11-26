'use strict';

angular.module('waitingRoomApp')
    .controller('TabletDoctorListCtrl', function ($scope, $rootScope, $location, $routeParams, Restangular, localStorageService) {
        $scope.basePatients = Restangular.all("patients");

        function init() {
            if (!$rootScope.tablet_user) {
                $location.path('tablet');
            }

            $rootScope.tablet_ui = true;

            if($routeParams.direction === "previous") {
                $scope.page_class = 'page-slide-in-left';
            }

            if($routeParams.direction === "next") {
                $scope.page_class = 'page-slide-in-right';
            }
        }

        function nextSlide () {
            $scope.page_class = 'page-slide-in-right';
            $location.path('tablet/appointment-time/next')
        }

        function createPatient (doctor) {
            $scope.basePatients.post({Doctor:doctor._id}).then(function (patient) {
                $rootScope.tablet_user = patient;
                //Saves current patient in local storage
                localStorageService.set('tablet_user', patient);

                //Redirect to first question
                nextSlide();
            }, function () {
                //Reset tablet user and redirect to frontpage
                $rootScope.resetTabletUser();
                $location.path('tablet');
            });
        }

        $scope.backSlide = function () {
            $scope.page_class = 'page-fade-out';
            $location.path('/tablet/previous');
        };

        $scope.selectDoctor = function (doctor) {
            if(!doctor) return;

            createPatient(doctor);
        }



        init();
    });
