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
        'angular-loading-bar',
        'webcam'
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
                    },
                    patients: function (Restangular) {
                        return Restangular.all("patients").getList();
                    }
                }
            })
            .when('/patient/:id/scheme/:scheme', {
                templateUrl: 'partials/patient',
                controller: 'PatientCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['User', 'Editor', 'Admin']);
                    },
                    patient: function (Restangular, $route) {
                        return Restangular.one('patients', $route.current.params.id).one('scheme', $route.current.params.scheme).get();
                    }
                }
            })
            .when('/builder/scheme/:id', {
                templateUrl: 'partials/builder/scheme-builder',
                controller: 'SchemeBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    },
                    scheme: function (Restangular, $route) {
                        return Restangular.one('schemes', $route.current.params.id).get();
                    }
                }
            })
            .when('/builder/step/:id', {
                templateUrl: 'partials/builder/step-builder',
                controller: 'StepBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    },
                    step: function (Restangular, $route) {
                        return Restangular.one('steps', $route.current.params.id).get();
                    }
                }
            })
            .when('/builder/question/:id', {
                templateUrl: 'partials/builder/question-builder',
                controller: 'QuestionBuilderCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Editor', 'Admin']);
                    },
                    question: function (Restangular, $route) {
                        return Restangular.one('questions', $route.current.params.id).get();
                    }
                }
            })
            .when('/customers', {
                templateUrl: 'partials/customers/clinics',
                controller: 'ClinicsCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Admin']);
                    },
                    clinics: function (Restangular) {
                        return  Restangular.all("clinics").getList();
                    },
                    users: function (Restangular) {
                        return  Restangular.all("users").getList();
                    }
                }
            })
            .when('/customer/clinic/:id', {
                templateUrl: 'partials/customers/doctors',
                controller: 'DoctorsCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Admin']);
                    },
                    users: function (Restangular) {
                        return  Restangular.all("users").getList();
                    },
                    clinic: function (Restangular, $route) {
                        return Restangular.one('clinics', $route.current.params.id).get();
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
            .when('/tablet/question/:id/:direction', {
                templateUrl: 'partials/tablet/tablet_question',
                controller: 'TabletQuestionCtrl',
                resolve: {
                    loggedin: function (Auth) {
                        return Auth.isLoggedIn(['Tablet']);
                    }
                }
            })
            .when('/tablet/schemes/:direction', {
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
    .run(function ($rootScope, $location, $window, Auth, Restangular) {
        //================================================
        // Listen for coneection status
        //================================================
        $rootScope.online = navigator.onLine;

        $window.addEventListener("offline", function () {
            console.log("Is offline");
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);

        $window.addEventListener("online", function () {
            console.log("Is online");
            $rootScope.$apply(function() {
                $rootScope.online = true;
            });
        }, false);

        //================================================
        // Configure restangular
        //================================================
        Restangular.setBaseUrl('api');

        //================================================
        // Redirection on auth equals false
        //================================================
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });