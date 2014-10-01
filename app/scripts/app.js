'use strict';

angular.module('waitingRoomApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'ngAnimate-animate.css',
        'xeditable',
        'ngClipboard',
        'restangular',
        'ui.tree',
        'ui.bootstrap',
        'angular-loading-bar'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {

        //================================================
        // Define all the routes
        //================================================

        $routeProvider
            .when('/', {
                templateUrl: 'partials/frontpage',
                controller: 'FrontpageCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['User', 'Editor', 'Admin']);
                    }
                }
            })
            .when('/patient/:step/:id', {
                templateUrl: 'partials/patient',
                controller: 'PatientCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['User', 'Editor', 'Admin']);
                    }
                }
            })
            .when('/builder/scheme/:id', {
                templateUrl: 'partials/builder/scheme-builder',
                controller: 'SchemeBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    }
                }
            })
            .when('/builder/step/:id', {
                templateUrl: 'partials/builder/step-builder',
                controller: 'StepBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    }
                }
            })
            .when('/builder/question/:id', {
                templateUrl: 'partials/builder/question-builder',
                controller: 'QuestionBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    }
                }
            })
            .when('/customers', {
                templateUrl: 'partials/customers/clinics',
                controller: 'ClinicsCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Admin']);
                    }
                }
            })
            .when('/customer/clinic/:id', {
                templateUrl: 'partials/customers/doctors',
                controller: 'DoctorsCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Admin']);
                    }
                }
            })
            .when('/settings', {
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['User', 'Editor', 'Admin']);
                    }
                }
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/tablet/:direction/:id', {
                templateUrl: 'partials/tablet/tablet_question',
                controller: 'TabletQuestionCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .when('/tablet/schemes', {
                templateUrl: 'partials/tablet/tablet_scheme_list',
                controller: 'TabletSchemeListCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .when('/tablet', {
                templateUrl: 'partials/tablet/tablet_doctor_list',
                controller: 'TabletDoctorListCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .when('/tablet/finish', {
                templateUrl: 'partials/tablet/tablet_finish',
                controller: 'TabletFinishCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .when('/tablet/thankyou', {
                templateUrl: 'partials/tablet/tablet_thankyou',
                controller: 'TabletThankYouCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = false;

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        }]);
    })
    .run(function ($rootScope, $location, Auth, Restangular) {

        //================================================
        // Configure restangular
        //================================================
        Restangular.setBaseUrl('api');

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next) {

            //$rootScope.$broadcast("event:load_start");


            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });